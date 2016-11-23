#!/usr/bin/env python2

import time
import copy
start = time.time()

import argparse
import cv2
import os
import pickle

import numpy as np
np.set_printoptions(precision=2)
from sklearn.mixture import GMM
import openface

fileDir = os.path.dirname(os.path.realpath(__file__))
modelDir = os.path.join(fileDir, 'models')
dlibModelDir = os.path.join(modelDir, 'dlib')
openfaceModelDir = os.path.join(modelDir, 'openface')
unknownCounter=0
globalPersons = [] #the list that keeps the information about who appeared on the frame

def findIndex(person,globalPersons): #finds the index of a name in the objects list
	for j in range(len(globalPersons)):
		if person == globalPersons[j].name:
			return j
	return -1



def distanceFromPoints(point1,point2): #given two pixel coordinates of the top and the bottom of the rectangle in someone's face, finds the distance of this person from the camera in centimeters
	heigth=point1-point2
	realcm=0
	realcm=68*63/heigth
	return realcm

def updateGlobalList(persons,confidences,points): #from the names of the persons on a frame, updates the object list in terms of a student object with a name, distance and coordinates of his face
	for i in persons:
		flag=0
		for j in globalPersons:
			if i == j.name:
				flag=1
		if(flag==0):
			tempStudent=Student(i)
			globalPersons.append(tempStudent) #if the person with this name doesnt exist on the list, appends an object with this name
	for i in range(len(persons)): #updates every student object in the list 
		index=findIndex(persons[i],globalPersons)
		distanceInCm=distanceFromPoints(points[i][1][1],points[i][0][1])
		globalPersons[index].update(distanceInCm,points[i])

def isSame(pointsi,globallisti): #finds if an unknown frame is the same as a known person by checking the similarity of their coordinates
    if(pointsi[0][0]-globallisti.avLeft<5 and pointsi[0][1]-globallisti.avTop<5 and pointsi[1][0]-globallisti.avRight<5 and pointsi[1][1]-globallisti.avBottom<5):
        return True
    else:
        return False

class Student: 
    def __init__(self,name):
        self.name=name
        self.averageDistance=0
        self.numberOfDistances=0
        self.avTop=0
        self.avBottom=0
        self.avRight=0
        self.avLeft=0
    def update (self,distance,pointsi): #average calculation of distance and coordinates of face
        temp=self.averageDistance*self.numberOfDistances
        temp1=self.avBottom*self.numberOfDistances
        temp2=self.avTop*self.numberOfDistances
        temp3=self.avLeft*self.numberOfDistances
        temp4=self.avRight*self.numberOfDistances
        self.numberOfDistances=self.numberOfDistances+1
        temp=temp+distance
        temp1=temp1+pointsi[1][1]
        temp2=temp2+pointsi[0][1]
        temp3=temp3+pointsi[0][0]
        temp4=temp4+pointsi[1][0]

        temp=temp*1.0/self.numberOfDistances
        temp1=temp1*1.0/self.numberOfDistances
        temp2=temp2*1.0/self.numberOfDistances
        temp3=temp3*1.0/self.numberOfDistances
        temp4=temp4*1.0/self.numberOfDistances

        self.averageDistance=temp


        self.avBottom=temp1
        self.avTop=temp2  #(i[0][0],i[0][1]),(i[1][0],i[1][1]) left top right bottom
        self.avLeft=temp3
        self.avRight=temp4


		

def getRep(bgrImg):
    start = time.time()
    if bgrImg is None:
        raise Exception("Unable to load image/frame")

    rgbImg = cv2.cvtColor(bgrImg, cv2.COLOR_BGR2RGB)

    if args.verbose:
        print("  + Original size: {}".format(rgbImg.shape))
    if args.verbose:
        print("Loading the image took {} seconds.".format(time.time() - start))

    start = time.time()

    # Get the largest face bounding box
    # bb = align.getLargestFaceBoundingBox(rgbImg) #Bounding box

    # Get all bounding boxes
    points=[]
    bb = align.getAllFaceBoundingBoxes(rgbImg)
    for i in range(len(bb)):
    	points.append(((bb[i].left(),bb[i].top()),(bb[i].right(),bb[i].bottom())))
    if bb is None:
        # raise Exception("Unable to find a face: {}".format(imgPath))
        return None
    if args.verbose:
        print("Face detection took {} seconds.".format(time.time() - start))

    start = time.time()

    alignedFaces = []
    for box in bb:
        alignedFaces.append(
            align.align(
                args.imgDim,
                rgbImg,
                box,
                landmarkIndices=openface.AlignDlib.OUTER_EYES_AND_NOSE))

    if alignedFaces is None:
        raise Exception("Unable to align the frame")
    if args.verbose:
        print("Alignment took {} seconds.".format(time.time() - start))

    start = time.time()

    reps = []
    for alignedFace in alignedFaces:
        reps.append(net.forward(alignedFace))

    if args.verbose:
        print("Neural network forward pass took {} seconds.".format(
            time.time() - start))

    # print reps
    return (reps,points)


def infer(img, args):
    with open(args.classifierModel, 'r') as f:
        (le, clf) = pickle.load(f)  # le - label and clf - classifer

    reps,points = getRep(img)
    persons = []
    confidences = []
    for rep in reps:
        try:
            rep = rep.reshape(1, -1)
        except:
            print "No Face detected"
            return (None, None)
        start = time.time()
        predictions = clf.predict_proba(rep).ravel()
        # print predictions
        maxI = np.argmax(predictions)
        # max2 = np.argsort(predictions)[-3:][::-1][1]
        persons.append(le.inverse_transform(maxI))
        # print str(le.inverse_transform(max2)) + ": "+str( predictions [max2])
        # ^ prints the second prediction
        confidences.append(predictions[maxI])
        if args.verbose:
            print("Prediction took {} seconds.".format(time.time() - start))
            pass
        # print("Predict {} with {:.2f} confidence.".format(person, confidence))
        if isinstance(clf, GMM):
            dist = np.linalg.norm(rep - clf.means_[maxI])
            print("  + Distance from the mean: {}".format(dist))
            pass
    return (persons, confidences, points)


if __name__ == '__main__':

    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--dlibFacePredictor',
        type=str,
        help="Path to dlib's face predictor.",
        default=os.path.join(
            dlibModelDir,
            "shape_predictor_68_face_landmarks.dat"))
    parser.add_argument(
        '--networkModel',
        type=str,
        help="Path to Torch network model.",
        default=os.path.join(
            openfaceModelDir,
            'nn4.small2.v1.t7'))
    parser.add_argument('--imgDim', type=int,
                        help="Default image dimension.", default=96)
    parser.add_argument(
        '--captureDevice',
        type=int,
        default=0,
        help='Capture device. 0 for latop webcam and 1 for usb webcam')
    parser.add_argument('--width', type=int, default=320)
    parser.add_argument('--height', type=int, default=240)
    parser.add_argument('--time', type=int, default=15) #time option that determines how long the calculations and video will be
    parser.add_argument('--threshold', type=float, default=0.65)
    parser.add_argument('--cuda', action='store_true')
    parser.add_argument('--verbose', action='store_true')
    parser.add_argument(
        'classifierModel',
        type=str,
        help='The Python pickle representing the classifier. This is NOT the Torch network model, which can be set with --networkModel.')

    args = parser.parse_args()

    align = openface.AlignDlib(args.dlibFacePredictor)

    net = openface.TorchNeuralNet(
        args.networkModel,
        imgDim=args.imgDim,
        cuda=args.cuda)

    # Capture device. Usually 0 will be webcam and 1 will be usb cam.
    video_capture = cv2.VideoCapture(args.captureDevice)

    #video_capture=cv2.imread('/home/ata/Downloads/envenon.jpg')
    '''for i in range(0,len(video_capture)):
	for j in range(0,len(video_capture[0])):
		if(video_capture[i][j][0]<205):
			video_capture[i][j][0]+=50
		else:
			video_capture[i][j][0]=255

		if(video_capture[i][j][1]<205):
			video_capture[i][j][1]+=50
		else:
			video_capture[i][j][1]=255

		if(video_capture[i][j][2]<205):
			video_capture[i][j][2]+=50
		else:
			video_capture[i][j][2]=255'''

    #print type(video_capture)
    video_capture.set(3, args.width)
    video_capture.set(4, args.height)
    counter=time.time() 
    confidenceList = []
    while True:
        diff=time.time()-counter
        print diff
        if (diff>args.time):
            break
        ret, frame = video_capture.read()
        #frame=video_capture
        persons, confidences, points = infer(frame, args)
        try:
            # append with two floating point precision
            confidenceList.append('%.2f' % confidences[0])
        except:
            # If there is no face detected, confidences matrix will be empty.
            # We can simply ignore it.
            pass

        for i, c in enumerate(confidences): #TODO merging an unknown with a known face
            if c <= args.threshold:  # 0.5 is kept as threshold for known face.
                #index=findIndex("_unknown",globalPersons)
                #if(index==-1):
                persons[i]="_unknown"
                #else:
                    #if(not isSame(points[i],globalPersons[index])):
                        #persons[i]="_unknown"+str(unknownCounter)
                        #unknownCounter=unknownCounter+1


        updateGlobalList(persons,confidences,points) #updates global list if there is a new person in the frame and also updates the distance


        #print "P: " + str(persons) + " C: " + str(confidences)
        for i in globalPersons:
        	print i.name +" "+ str(i.averageDistance) +" " +str(i.avTop) +" " +str(i.avBottom) +" "+ str(i.avRight)+" " +str(i.avLeft)

        print (" ")

                # Print the person name and conf value on the frame
        cv2.putText(frame, "P: {} C: {}".format(persons, confidences),
                    (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        c=0
        for i in points:
        	cv2.rectangle(frame,(i[0][0],i[0][1]),(i[1][0],i[1][1]), (0,255,0),2)
        	cv2.putText(frame, str(persons[c]) ,(i[1][0]+5, i[1][1]+5), cv2.FONT_HERSHEY_SIMPLEX, 0.5 ,(0,0,255) , 1 )
        	cv2.putText(frame, str(globalPersons[findIndex(persons[c],globalPersons)].averageDistance) ,(i[1][0]+15 , i[1][1]+15), cv2.FONT_HERSHEY_SIMPLEX, 0.5 ,(0,0,255) , 1 )  #puts average distance on the rectangle
        	c=c+1
        cv2.imshow('', frame)
        # quit the program on the press of key 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    # When everything is done, release the capture

    video_capture.release()
    cv2.destroyAllWindows()
