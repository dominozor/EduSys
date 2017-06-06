#!/usr/bin/env python2

import time
import copy
start = time.time()

import argparse
import cv2
import os
import pickle
import random
import string

import numpy as np
np.set_printoptions(precision=2)
from sklearn.mixture import GMM
import openface

fileDir = os.path.dirname(os.path.realpath(__file__))
modelDir = os.path.join(fileDir, 'models')
dlibModelDir = os.path.join(modelDir, 'dlib')
openfaceModelDir = os.path.join(modelDir, 'openface')
unknownCounter=[0]
globalPersons = [] #the list that keeps the information about who appeared on the 



def wrongPersonDelete(): #checks if a person is tagged wrongly a few times instead of a person
    deleteunk=-1
    for i in range(len(globalPersons)):
        if(globalPersons[i].name!="_unknown"):
            for j in range(len(globalPersons)):
                if(globalPersons[j].name!="_unknown" and globalPersons[j].name != globalPersons[i].name):                    
                    if(globalPersons[j].avTop-globalPersons[i].avTop <20 or globalPersons[i].avTop-globalPersons[j].avTop<20):
                        if(globalPersons[j].avLeft-globalPersons[i].avLeft<20 or globalPersons[i].avLeft-globalPersons[j].avLeft<20):
                            if(globalPersons[j].avRight-globalPersons[i].avRight<20 or globalPersons[i].avRight-globalPersons[j].avRight<20):
                                if(globalPersons[j].avBottom-globalPersons[i].avBottom<20 or globalPersons[i].avBottom-globalPersons[j].avBottom<20):
                                    
                                    if(10*(globalPersons[i].numberOfDistances)<globalPersons[j].numberOfDistances):
                                       
                                        deleteunk=i

                                    if(10*(globalPersons[j].numberOfDistances)<globalPersons[i].numberOfDistances):
                                       
                                        deleteunk=j

    if(deleteunk!=-1):
        globalPersons.pop(deleteunk)                                    



def check(): #checks if coordinates of an unknown is very similar to a known person, then merges them 
    notUnk=[]
    for q in globalPersons:
        if q.name[0]!="_":
            notUnk.append(q)
    deleteunk=-1
    for i in range(len(globalPersons)):
        if(globalPersons[i].name=="_unknown"):
            for j in range(len(globalPersons)):
                if(globalPersons[j].name!="_unknown"):                    
                    if(globalPersons[j].avTop-globalPersons[i].avTop <20 or globalPersons[i].avTop-globalPersons[j].avTop<20):
                        if(globalPersons[j].avLeft-globalPersons[i].avLeft<20 or globalPersons[i].avLeft-globalPersons[j].avLeft<20):
                            if(globalPersons[j].avRight-globalPersons[i].avRight<20 or globalPersons[i].avRight-globalPersons[j].avRight<20):
                                if(globalPersons[j].avBottom-globalPersons[i].avBottom<10 or globalPersons[i].avBottom-globalPersons[j].avBottom<20):
                                    
                                    globalPersons[j].avTop=(globalPersons[j].avTop+globalPersons[i].avTop)/2.0
                                    globalPersons[j].avLeft=(globalPersons[j].avLeft+globalPersons[i].avLeft)/2.0
                                    globalPersons[j].avRight=(globalPersons[j].avRight+globalPersons[i].avRight)/2.0
                                    globalPersons[j].avBottom=(globalPersons[j].avBottom+globalPersons[i].avBottom)/2.0
                                    deleteunk=i

    if(deleteunk!=-1):
        globalPersons.pop(deleteunk)





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

def findUnknownName(pointsi):
    unknownPersons=[]
    for i in globalPersons:
        if(i.name[0]=='_'):
            unknownPersons.append(i)

    for i in globalPersons:
        #(i[0][0],i[0][1]),(i[1][0],i[1][1]) left top right bottom 
        if(pointsi[0][1]-i.avTop <10 or i.avTop-pointsi[0][1] <10):
            if(pointsi[0][0]-i.avLeft<10 or i.avLeft-pointsi[0][0]<10):
                if(pointsi[1][0]-i.avRight<10 or i.avRight-pointsi[1][0]<10):
                    if(pointsi[1][1]-i.avBottom<10 or i.avBottom-pointsi[1][1]<10):
                        return i.name
    unknownCounter[0]=unknownCounter[0]+1
    return "yeniunknown"+str(unknownCounter[0])

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
        type=str,
        default="0",
        help='Capture device. 0 for latop webcam and 1 for usb webcam')
    parser.add_argument('--width', type=int, default=320)
    parser.add_argument('--height', type=int, default=240)
    parser.add_argument('--picPath', type=str , default="")
    parser.add_argument('--imgCount', type=int , default=0)
    parser.add_argument('--time', type=int, default=15) #time option that determines how long the calculations and video will be
    parser.add_argument('--threshold', type=float, default=0.60)
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
    if(args.picPath!=""):
    	for i in range(args.imgCount):
    		print args.picPath+"/"+str(i)
	    	frame = cv2.imread(args.picPath+"/"+str(i),1)
	    	persons, confidences, points = infer(frame, args)
	    	updateGlobalList(persons,confidences,points)
	        try:
	            # append with two floating point precision
	            confidenceList.append('%.2f' % confidences[0])
	        except:
	            # If there is no face detected, confidences matrix will be empty.
	            # We can simply ignore it.
	            pass

	        for i, c in enumerate(confidences): 
	            if c <= args.threshold:  # 0.5 is kept as threshold for known face.

	                name="_unknown"
	                #else:
	                 #   name = findUnknownName(points[i])

	                persons[i]=name
        for i in globalPersons:
				print "{ \"name\": \""+i.name +"\" ,\"distance\": "+ str(i.averageDistance) +" , \"topCoor\": " +str(i.avTop) +", \"bottomCoor\": " +str(i.avBottom) +", \"rightCoor\":"+ str(i.avRight)+", \"leftCoor\": " +str(i.avLeft)+"}"
					



    else:
	    if args.captureDevice=="0":
			args.captureDevice=0
	    video_capture = cv2.VideoCapture(args.captureDevice)
	    counter=time.time()
	    lastSave = time.time()
	    confidenceList = []
	    while True:
	        diff=time.time()-counter
	        if (diff>args.time):
				for i in globalPersons:
					print "{ \"name\": \""+i.name +"\" ,\"distance\": "+ str(i.averageDistance) +" , \"topCoor\": " +str(i.avTop) +", \"bottomCoor\": " +str(i.avBottom) +", \"rightCoor\":"+ str(i.avRight)+", \"leftCoor\": " +str(i.avLeft)+"}"
				break
	        if(diff>5 and diff%5<1):
	            wrongPersonDelete()
	            
	        ret, frame = video_capture.read()
	        

	        persons, confidences, points = infer(frame, args)
	        try:
	            # append with two floating point precision
	            confidenceList.append('%.2f' % confidences[0])
	        except:
	            # If there is no face detected, confidences matrix will be empty.
	            # We can simply ignore it.
	            pass

	        for i, c in enumerate(confidences): 
	            if c <= args.threshold:  # 0.5 is kept as threshold for known face.

	                name="_unknown"
	               

	                persons[i]=name
	                
	        updateGlobalList(persons,confidences,points) #updates global list if there is a new person in the frame and also updates the distance
	        check() #
	        

	                # Print the person name and conf value on the frame
	        cv2.putText(frame, "P: {} C: {}".format(persons, confidences),
	                    (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
	        c=0
	        for i in points:
	            # get the time
	            saveDiff = time.time() - lastSave
	            if (saveDiff >= 60):  # save for every minute
	                #print "Saving a new image of " + persons[c] + "..."
	                lastSave = time.time()
	                # make image gray
	                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	                # take the face as a rectangle
	                face = gray[i[0][1]:i[0][1] + (i[1][1] - i[0][1]), i[0][0]:i[0][0] + (i[1][0] - i[0][0])]
	                # resize the face
	                face_resize = cv2.resize(face, (130, 100))
	                # save image with a random name with lenght 20
	                rand = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
	                path = os.path.join('datasets', persons[c])  # get the path to dataset with name
	                cv2.imwrite('%s/%s.png' % (path, rand), face_resize)

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
