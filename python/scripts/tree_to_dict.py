import json
import sklearn 
from sklearn.tree import _tree

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

    print("inspect tree at depth {}".format(node_index))
    
    left_child = tree.children_left[node_index]
    right_child = tree.children_right[node_index]
    
    if left_child == _tree.TREE_LEAF:
        print("this node is a leaf") 
        print("tree.value[node_index]: {}".format(tree.value[node_index]))
        count_labels = zip(tree.value[node_index, 0], labels)
        samples = tree.n_node_samples[node_index]
        print("samples: {}".format(samples))
        print("count labels: {}".format(count_labels))
        print("count_labels: {}")
        leaf_label = "{} points".format(samples)
        node['name'] = leaf_label
    else:
        left_index = tree.children_left[node_index]
        right_index = tree.children_right[node_index]
        node['children'] = [rules(tree, features, labels, right_index),
                            rules(tree, features, labels, left_index)]
    return node

    print("is this node a leaf? ({})".format(
        tree.left_child == _tree.TREE_LEAF))

    # if tree.children_left[node_index] == -1:  # indicates leaf
    #     count_labels = zip(clf.tree_.value[node_index, 0], labels)
    #     node['name'] = ', '.join(('{} of {}'.format(int(count), label)
    #                               for count, label in count_labels))
    # else:
    #     feature = features[clf.tree_.feature[node_index]]
    #     threshold = clf.tree_.threshold[node_index]
    #     node['name'] = '{} > {}'.format(feature, threshold)
    #     left_index = clf.tree_.children_left[node_index]
    #     right_index = clf.tree_.children_right[node_index]
    #     node['children'] = [rules(clf, features, labels, right_index),
    #                         rules(clf, features, labels, left_index)]
    # return node


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



