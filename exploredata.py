# Helping function to help with exploratory data analysis
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from scipy import stats


# helper functions for plotting

def binary_to_ints(value):
    if value == True:
      return 1
    else:
      return 0



def train_validate_test_split(data, target, seed = 126):
    """
    It splits the data into train, validate and test sets.
    :param data: the dataframe you want to split
    :param target: The column name of the target variable
    :param seed: The random seed to use when splitting the data, defaults to 126 (optional)
    :return: three dataframes: train, validate, and test.
    """
    train_validate, test = train_test_split(data, test_size=0.20, random_state=seed, stratify=data[target])
    train, validate = train_test_split(train_validate, test_size=0.30, random_state=seed,stratify=train_validate[target])
    return train, validate, test


def process_unencoded_data(data):
    """
    It takes in a dataframe, drops duplicates, removes rows where tenure is 0, removes $ and , from
    TotalCharges, converts TotalCharges to float, strips whitespace from all object columns, and returns
    a train, validate, and test dataframe
    """
    data.drop_duplicates(inplace = True)
    categorical_columns = data.select_dtypes('object').columns

    for column in categorical_columns:
        data[column] = data[column].str.strip()
    return train_validate_test_split(data, 'Revenue')




# univariate data exploratory analysis

def univariate(data, categorical_vars, quantitative_vars):
    """
    This function takes in a dataframe, a list of categorical variables, and a list of quantitative
    variables. It then calls the univariate_categorical function for each categorical variable and the
    univariate_quant function for each quantitative variable.
    """
    for var in categorical_vars:
        univariate_categorical(data, var)

    for column in quantitative_vars:
        plot, descriptive_statistics = univariate_quant(data, column)
        plt.gca(figsize = 10)
        plt.show(plot)
        print(descriptive_statistics)


def univariate_categorical(data, categorical_vars):
    """
    It creates a bar chart of the frequency of each category in a categorical variable.
    :param data: the dataframe
    :param categorical_vars: The categorical variable you want to plot
    """
    frequency_table = freq_table(data, categorical_vars)
    plt.figure(figsize=(6,3))
    sns.barplot(x=categorical_vars, y='Count', data=frequency_table, color='lightblue')
    plt.xticks(rotation = 90)
    plt.title(categorical_vars)
    plt.show()
    print(frequency_table)

def univariate_quant(data,quantitative_variables):

    descriptive_statistics = data[quantitative_variables].describe()
    plt.figure(figsize=(8,2))
    plot = plt.subplot(1, 2, 1)
    plot = plt.hist(data[quantitative_variables], color='yellow')
    plot = plt.title(quantitative_variables)
    plot = plt.subplot(1, 2, 2)
    plot = plt.boxplot(data[quantitative_variables])
    plot = plt.title(quantitative_variables)
    return plot, descriptive_statistics


def freq_table(train, cat_var):
    """
    It takes a dataframe and a categorical variable as input, and returns a frequency table as output
    :return: A dataframe with the unique values of the categorical variable, the count of each unique
    value, and the percentage of each unique value.
    """
    class_labels = list(train[cat_var].unique())
    freq_table = (
      pd.DataFrame(
        {cat_var: class_labels,
        'Count': train[cat_var].value_counts(normalize=False),
        'Percent': round(train[cat_var].value_counts(normalize=True)*100,2)
        }))

    return freq_table



# Bivariate data exploratory Analysis
def bivariate_categorical(data, target, categorical_variable):
    """
    It takes a dataframe, a target variable, and a categorical variable, and returns a crosstab of the
    two variables and a bar chart of the crosstab
    """
    ct = pd.crosstab(data[categorical_variable], data[target], margins=True)
    plot = plot_cat_by_target(data, target, categorical_variable)
    print("\nobserved:\n", ct)
    plt.show(plot)



def bivariate_quant(data, target, quantitative_var):
    """
    It takes a dataframe, a target variable, and a quantitative variable, and then it prints the
    descriptive statistics for the quantitative variable, grouped by the target variable. It also plots
    a boxen plot of the quantitative variable, grouped by the target variable
    """
    print(quantitative_var, "\n____________________\n")
    descriptive_stats = data.groupby(target)[quantitative_var].describe()
    plt.figure(figsize=(4,4))
    plot_boxen(data, target, quantitative_var)
    # plot_swarm(data, target, quantitative_vars)
    plt.show()
    print(descriptive_stats, "\n")


def plot_swarm(data, target_variable, quantitative_var):
    """
    It plots a swarmplot of the quantitative variable against the target variable.
    """
    average = data[quantitative_var].mean()
    p = sns.swarmplot(data=data, x=target_variable, y=quantitative_var, color='lightgray')
    p = plt.title(quantitative_var)
    p = plt.axhline(average, ls='--', color='black')
    return p


def plot_boxen(data, target_variable, quantitative_var):
    """
    It plots a boxen plot for the quantitative variable and the target variable.
    """
    average = data[quantitative_var].mean()
    p = sns.boxenplot(data=data, x=target_variable, y=quantitative_var, color='orange')

    p = plt.title(quantitative_var)
    p = plt.axhline(average, ls='--', color='black')
    return p


def compare_means(data, target_variable, quantitative_vars, alt_hyp='two-sided'):
    x = data[data[target_variable]==0][quantitative_vars]
    y = data[data[target_variable]==1][quantitative_vars]
    return stats.mannwhitneyu(x, y, use_continuity=True, alternative=alt_hyp)


def run_chi2(data, categorical_var, target_variable):
    """
    It takes in a dataframe, a categorical variable, and a target variable. It then runs a chi-squared
    test on the dataframe and returns the chi-squared summary, the observed values, and the expected
    values.
    """
    observed = pd.crosstab(data[categorical_var], data[target_variable])
    chi2, p, degf, expected = stats.chi2_contingency(observed)
    chi2_summary = pd.DataFrame({'chi2': [chi2], 'p-value': [p],
                                 'degrees of freedom': [degf]})
    expected = pd.DataFrame(expected)
    return chi2_summary, observed, expected


def plot_cat_by_target(data, target_variable, categorical_var):
    """
    It takes a dataframe, a target variable, and a categorical variable, and plots the mean of the
    target variable for each category of the categorical variable
    :return: A plot
    """
    p = plt.figure(figsize=(10,2))
    p = sns.barplot(categorical_var, target_variable, data=data, alpha=.8, color='lightseagreen')
    overall_rate = data[target_variable].mean()
    p = plt.axhline(overall_rate, ls='--', color='gray')
    return p




def two_t_test(data, quantitative_vars, target_variable):
    """
    The function takes in a dataframe, a list of quantitative variables, and a target variable. It then
    performs a Shapiro-Wilk test to check for normality, and if the p-value is less than 0.05, it
    performs a Mann-Whitney U test. If the p-value is greater than 0.05, it performs a Levene test to
    check for homogeneity of variance, and if the p-value is less than 0.05, it performs a Mann-Whitney
    U test.
    """
    columns = []
    p_values = []
    test_significance = []
    for var in quantitative_vars:
        columns.append(var)
        category_1 = data[var][data[target_variable] == False]
        category_2 = data[var][data[target_variable] == True]
        for bol in [category_1]:
            t_stats1, p_val1 = stats.shapiro(bol)
        for bin in [category_2]:
            t_stats2, p_val2 = stats.shapiro(bin)
        if p_val1 > 0.05 or p_val2 > 0.05:
            stats_3, p_val3 = stats.levene(category_1, category_2)

        if p_val1 <= 0.05 or p_val2 <= 0.05 or p_val3 <= 0.05:
            ms, mp = stats.mannwhitneyu(category_1, category_2)
            p_values.append(round(mp, 4))
        if mp < 0.05:
            test_significance.append('significant')
        else:
            test_significance.append('insignificant')

    return pd.DataFrame({'Feature': columns, 'P-Value': p_values, 'Significance': test_significance})