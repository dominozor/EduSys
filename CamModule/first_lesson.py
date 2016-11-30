#!/usr/bin/env python2

import cv2
import os
import openface
import random
import string

(width, height) = (130, 100)  # defining the size of images
webcam = cv2.VideoCapture(0) # opening webcam
align = openface.AlignDlib('models/dlib/shape_predictor_68_face_landmarks.dat')

#create datasets directory if it doesn't exist
if not os.path.isdir('datasets'):
    os.mkdir('datasets')

paths = []
points = []
(_, im) = webcam.read()  # im=frame
bb = align.getAllFaceBoundingBoxes(im)
for i in range(len(bb)): #first image
    #20 length randoms concateneted with 'unknown'
    rand2 = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
    unknownName = 'unknown' + rand2
    path = os.path.join('datasets', unknownName)
    if not os.path.isdir(path): #create unknown + randNumber directories into datasets folder
        os.mkdir(path)
    paths.append(path)
for i in range(len(bb)):
    points.append(((bb[i].left(),bb[i].top()),(bb[i].right(),bb[i].bottom())))

# The program loops until it has 10 images of every face.
# In the loop, if faces are in the same coordinates with the before appended unknows,
# it saves faces into that unknowns folder.
# if not, it creates a new directory and save photos into that directory.
count = 0
while count < 10:
    count += 1
    newPoints = []
    (_, im) = webcam.read()
    bb = align.getAllFaceBoundingBoxes(im)

    for i in range(len(bb)):
        newPoints.append(((bb[i].left(), bb[i].top()), (bb[i].right(), bb[i].bottom())))

    for i in newPoints:
        face = im[i[0][1]:i[0][1] + (i[1][1] - i[0][1]), i[0][0]:i[0][0] + (i[1][0] - i[0][0])]
        face_resize = cv2.resize(face, (width, height))

    for i in newPoints:
        for j in points:
            if(abs(j[0][0] - i[0][0]) < 50) and (abs(j[0][1] - i[0][1]) < 50):
                if(abs(j[1][0] - i[1][0]) < 50) and (abs(j[1][1] - i[1][1] < 50)):
                    # save image with a random name with length 20
                    rand = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
                    index = points.index(j)
                    cv2.imwrite('%s/%s.png' % (paths[index], rand), face_resize)
                else:
                    rand2 = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
                    unknownName = 'unknown' + rand2
                    path = os.path.join('datasets', unknownName)
                    if not os.path.isdir(path):
                        os.mkdir(path)
                    paths.append(path)
                    points.append(i)
                    rand = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
                    cv2.imwrite('%s/%s.png' % (path, rand), face_resize)
            else:
                rand2 = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
                unknownName = 'unknown' + rand2
                path = os.path.join('datasets', unknownName)
                if not os.path.isdir(path):
                    os.mkdir(path)
                paths.append(path)
                points.append(((bb[i].left(), bb[i].top()), (bb[i].right(), bb[i].bottom())))
                rand = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(20))
                cv2.imwrite('%s/%s.png' % (path, rand), face_resize)

        cv2.imshow('OpenCV', im)
        key = cv2.waitKey(10)
        if key == 27:
            break