import json
import sklearn 
from sklearn.tree import _tree

# code from sklearn tree --> graphviz function:
# https://github.com/scikit-learn/scikit-learn/blob/51a765a/sklearn/tree/export.py#L63

# Useful blogs:
# from http://planspace.org/20151129-see_sklearn_trees_with_d3/
# http://aysent.github.io/2015/11/08/random-forest-leaf-visualization.html

def rules(tree, features, labels, node_index=0):
    """Structure of rules in a fit decision tree classifier

    Parameters
    ----------
    clf : DecisionTreeClassifier
        A tree that has already been fit.

    features, labels : lists of str
        The names of the features and labels, respectively.

    """
    node = {}

    #print("inspect tree at depth {}".format(node_index))
    
    left_child = tree.children_left[node_index]
    right_child = tree.children_right[node_index]

    # record the number of samples for that node. 
    samples = tree.n_node_samples[node_index]
    node['number of samples'] = str(samples) 
    # record the percent of samples
    percent = (100. * samples / float(tree.n_node_samples[0]))
    node['percent'] = round(percent, 2)
    
    if left_child == _tree.TREE_LEAF:
        #print("this node ({}) is a leaf".format(node_index)) 
        #print("tree.value[node_index]: {}".format(tree.value[node_index]))
        count_labels = zip(tree.value[node_index, 0], labels)
        samples = tree.n_node_samples[node_index]
        #print("samples: {}".format(samples))
        #print("count labels: {}".format(count_labels))
        #print("count_labels: {}")
        regression_value = round(tree.value[node_index][0][0], 2)
        leaf_label = "predicts {} for {} points".format(regression_value,
                                                        samples)
        node["name"] = leaf_label


    else:
        # Get info to store for that node:
        feature_number = tree.feature[node_index] 
        feature_name = features[feature_number]
        threshold = tree.threshold[node_index]
        threshold_rounded = round(threshold, 4)
        
        # todo: round the values before storing them as strings. 
        node["name"] = '{} > {}'.format(feature_name, threshold_rounded)

        # recurse through function for right and left children
        left_index = tree.children_left[node_index]
        right_index = tree.children_right[node_index]
        node["children"] = [rules(tree, features, labels, right_index),
                            rules(tree, features, labels, left_index)]
    return node


def save_tree_as_dict(clf, feature_names, label_names, save_path, node_index=0):
    """
    Wrapper for rules, that includes saving to a path and 
    more descriptive argument names
    """
    tree_dict = rules(clf, feature_names, label_names, node_index)
    # save the dict as a text file

    with open(save_path, 'w') as f:
        f.write("[\n")
        f.write(json.dumps(tree_dict))
        f.write("\n]")



