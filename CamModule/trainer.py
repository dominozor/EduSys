#!/usr/bin/env python2
import sys
import subprocess
import argparse
import os
import shlex
#This script takes 3 arguments:
#raw dataset folder, aligned dataset folder tobe created,
#feature directory where .csv and python pickle file generated to.
#It automates training process by executing following commands:
#$ ./align-dlib.py <path-to-raw-data> align outerEyesAndNose <path-to-aligned-data> --size 96
#$ ./batch-represent/main.lua -outDir <feature-directory> -data <path-to-aligned-data>
#$ ./classifier.py train <feature-directory>
if __name__ == '__main__':
	parser = argparse.ArgumentParser()
	parser.add_argument('--pathToProject', type=str, help="Path to project.")
	parser.add_argument('--pathToRawData', type=str, help="Path to dataset.", default="datasets")
	parser.add_argument('--pathToAlignedData', type=str, help="Path to save aligned faces.", default="datasetsAligned")
	parser.add_argument('--featureDirectory', type=str, help="Path to save .csv files.", default="feature")
	args = parser.parse_args()
	

	#check whether cache.t7 exists, delete if so. we need it to be deleted in order to train again.
	process = subprocess.Popen(['ls', args.pathToProject+'datasetsAligned/cache.t7'], shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	output, error = process.communicate()
	if output != '':
		os.system('rm -f '+args.pathToProject+'datasetsAligned/cache.t7')

	process = subprocess.Popen([args.pathToProject+'align-dlib.py', args.pathToProject+args.pathToRawData,'--pathToProject',args.pathToProject,'--dlibFacePredictor',args.pathToProject+'models/dlib/shape_predictor_68_face_landmarks.dat', 'align', 'outerEyesAndNose', args.pathToProject+args.pathToAlignedData, '--size', '96'],stdout=subprocess.PIPE)
	while True:
		output = process.stdout.readline()
		if output == '' and process.poll() is not None:
			break
		if output:
			print output.strip()
	process = subprocess.Popen([args.pathToProject+'batch-represent/main.lua', '-outDir', args.pathToProject+args.featureDirectory, '-data', args.pathToProject+args.pathToAlignedData],stdout=subprocess.PIPE)
	while True:
		output = process.stdout.readline()
		if output == '' and process.poll() is not None:
			break
		if output:
			print output.strip()
	process = subprocess.Popen([args.pathToProject+'classifier.py', 'train', args.pathToProject+args.featureDirectory],stdout=subprocess.PIPE)
	while True:
		output = process.stdout.readline()
		if output == '' and process.poll() is not None:
			break
		if output:
			print output.strip()

	os.system('rm -rf '+args.pathToProject+'datasets') #we don't need raw images anymore