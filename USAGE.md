#USAGE

```bash
$ for N in {1..8}; do ./align-dlib.py <path-to-raw-data> align outerEyesAndNose <path-to-aligned-data> --size 96 & done
```

##

```bash
$ ./batch-represent/main.lua -outDir <feature-directory> -data <path-to-aligned-data>
```
creates reps.csv and labels.csv in ```<feature-directory>.```

##

Use
```bash
$ ./classifier.py train <feature-directory>
```
to produce the classification model which is an SVM saved to disk as a Python pickle.

##

Run program with
```bash
$ ./classifier_webcam.py <feature-directory>/classifier.pkl
```




