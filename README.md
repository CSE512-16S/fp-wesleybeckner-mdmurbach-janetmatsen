# fp-wesleybeckner-mdmurbach-janetmatsen

This CSE 512 project demonstrates use of decision trees in random forests as a teaching tool.  
The live visualization is at [wesleybeckner-mdmurbach-janetmatsen](http://cse512-16s.github.io/fp-wesleybeckner-mdmurbach-janetmatsen/)

![Screenshot of project](https://github.com/CSE512-16S/fp-wesleybeckner-mdmurbach-janetmatsen/blob/master/images/screenshot.png)

## Decision Trees and Random Forests for Photoluminescence Prediction
Machine learning and high performance computing are revolutionizing strategies used to engineer new materials.  
By creating automated and adaptive experimental architectures, previously insermountable design spaces can now be considered \cite{UW}. 
In this spirit, this work aims to illustrate the performance of random forests as implemented in sklearn.ensemble.RandomForestRegressor \cite{scikit-learn} at predicting photoluminescence for perovskite solar cells. 
The tutorial is meant to be a creative exploration space to introduce other researchers and students to one of the most commonly used machine learning algorithms.

## Effort breakdown

Wesley Beckner brought the inspiration and enthusiasm for the initial project. He wrote the python code to use scikit-learn to predict the images, extended Janet's code to pull trees (estimators) from the randomForestRegressor, dabbled with Matt's code and python to properly render the output images and read slider values. He also pioneered the text tutorial that users can interact with upon loading the web page. 

Janet lead the tree efforts.  
This included witing the Python script tree_to_dict.py, which allowed the scikitlearn trees to be represented in D3.  
This script also encodes the transparency and line thicknesses which highlight features of the tree.   
She also wrote the scripts generate_tree.js and tree_styling.js, which create and style the D3 trees.  

Matt worked on the overall HTML layout, the creation of the images from the input files (generate_image.js), incorporating the sliders, and the connections/animations between the input/output.
