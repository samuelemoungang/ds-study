/* ============================================================================
   Data Science Study Hub — Question & Exercise bank
   Tous les contenus sont tirés des diapositives du cours (HES-SO Valais).
   Each module has:  quiz[]  (theory MCQ)  and  code[]  (fill-the-blank).
   ========================================================================== */

const MODULES = [
  /* ----------------------------------------------------------------------- */
  {
    id: "collecting",
    title: "Collecting Data",
    fr: "Collecte des données",
    icon: "⬇",
    blurb: "Loading files, pandas, missing values, web data.",
    quiz: [
      {
        q: "What is the main goal of data preparation?",
        fr: "Quel est l'objectif principal de la préparation des données ?",
        options: [
          "Ensure the quality and usefulness of data for downstream analysis",
          "Delete all categorical columns",
          "Train a neural network",
          "Compress the file size"
        ],
        a: 0
      },
      {
        q: "Why is pandas best suited for data processing?",
        fr: "Pourquoi pandas est-il adapté au traitement des données ?",
        options: [
          "It only works with images",
          "It excels at 2D tabular data (CSV, time series, databases) with many built-in features",
          "It is the fastest deep-learning framework",
          "It replaces SQL databases entirely"
        ],
        a: 1
      },
      {
        q: "What does pandas use to represent a missing value 'na' read from a file?",
        fr: "Par quoi pandas remplace-t-il une valeur manquante 'na' lue dans un fichier ?",
        options: ["0", "None of Python", "NaN (Not a Number)", "An empty string"],
        a: 2
      },
      {
        q: "Which method removes rows containing at least one missing value (by default)?",
        fr: "Quelle méthode supprime les lignes contenant au moins une valeur manquante ?",
        options: [".isna()", ".dropna()", ".drop_duplicates()", ".fillna()"],
        a: 1
      },
      {
        q: "An important warning about .dropna() is that it…",
        fr: "Un avertissement important sur .dropna() est qu'elle…",
        options: [
          "modifies the original variable automatically",
          "does NOT modify the original variable — you must reassign or use inplace=True",
          "only works on numeric columns",
          "removes columns, not rows"
        ],
        a: 1
      },
      {
        q: "Which pandas function automatically retrieves tables from an HTML page?",
        fr: "Quelle fonction pandas récupère automatiquement les tableaux d'une page HTML ?",
        options: ["pd.read_csv()", "pd.read_excel()", "pd.read_html()", "pd.read_json()"],
        a: 2
      },
      {
        q: "Web services typically return structured data in which formats?",
        fr: "Les services web renvoient des données structurées dans quels formats ?",
        options: ["Only CSV", "XML and JSON", "Only PNG", "Only PDF"],
        a: 1
      }
    ],
    code: [
      {
        title: "Read a text file with a context manager",
        fr: "Lire un fichier texte avec un gestionnaire de contexte",
        template: 'with open("Colors.txt", "r") as file:\n    content = file.___()\nprint(content)',
        blanks: ["read"],
        hint: "Method that returns the whole file content as a string."
      },
      {
        title: "Load a CSV with pandas",
        fr: "Charger un CSV avec pandas",
        template: 'import pandas as pd\ntitanic = pd.___("data/Titanic.csv")',
        blanks: ["read_csv"],
        hint: "Pandas function for comma-separated files."
      },
      {
        title: "Load a CSV without a header",
        fr: "Charger un CSV sans en-tête",
        template: 'titanic = pd.read_csv("data/Titanic_noheader.csv", ___=None)',
        blanks: ["header"],
        hint: "Parameter that tells pandas there is no header row."
      },
      {
        title: "Detect and drop missing values",
        fr: "Détecter et supprimer les valeurs manquantes",
        template: '# count missing per column\ncustomers.___().sum()\n# remove rows with missing values\ncustomers = customers.___()',
        blanks: ["isna", "dropna"],
        hint: "isXX() to detect, dropXX() to remove."
      },
      {
        title: "Remove duplicate rows",
        fr: "Supprimer les lignes en double",
        template: 'customers = customers.___()',
        blanks: ["drop_duplicates"],
        hint: "Method name contains 'duplicates'."
      }
    ]
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "exploring",
    title: "Exploring Data",
    fr: "Exploration des données",
    icon: "🔍",
    blurb: "info, describe, value_counts, loc/iloc, groupby, plots.",
    quiz: [
      {
        q: "What does info() show about a DataFrame?",
        fr: "Que montre info() sur un DataFrame ?",
        options: [
          "Only the first 5 rows",
          "Number of rows, columns, data types, and non-null counts",
          "A correlation matrix",
          "The mean of each column"
        ],
        a: 1
      },
      {
        q: "describe() by default computes statistics for which columns?",
        fr: "describe() calcule par défaut des statistiques pour quelles colonnes ?",
        options: ["Categorical columns", "Numeric columns", "All columns", "Only the index"],
        a: 1
      },
      {
        q: "Which method counts occurrences of each unique value in a column?",
        fr: "Quelle méthode compte les occurrences de chaque valeur unique ?",
        options: ["count()", "value_counts()", "unique()", "describe()"],
        a: 1
      },
      {
        q: ".loc and .iloc differ in that…",
        fr: ".loc et .iloc diffèrent en ceci que…",
        options: [
          ".loc uses explicit labels, .iloc uses integer positions",
          "they are identical",
          ".loc only works on rows",
          ".iloc uses column names"
        ],
        a: 0
      },
      {
        q: "When combining boolean filters, each condition must be…",
        fr: "En combinant des filtres booléens, chaque condition doit être…",
        options: [
          "joined with 'and'/'or' keywords",
          "in parentheses, combined with & (and) or | (or)",
          "written on separate lines",
          "converted to strings first"
        ],
        a: 1
      },
      {
        q: "What does groupby() do?",
        fr: "Que fait groupby() ?",
        options: [
          "Sorts the DataFrame",
          "Splits data into groups, applies a function, and combines results",
          "Removes duplicates",
          "Renames columns"
        ],
        a: 1
      },
      {
        q: "Which Matplotlib pattern does the course recommend for all plots?",
        fr: "Quel modèle Matplotlib le cours recommande-t-il pour tous les graphiques ?",
        options: [
          "plt.plot() only",
          "The fig, ax = plt.subplots() object-oriented interface",
          "Using Excel",
          "df.show()"
        ],
        a: 1
      }
    ],
    code: [
      {
        title: "Inspect structure and statistics",
        fr: "Inspecter structure et statistiques",
        template: 'mice.___()      # structure summary\nmice.___()  # numeric statistics',
        blanks: ["info", "describe"],
        hint: "One gives types/non-null, the other gives mean/std/quartiles."
      },
      {
        title: "Describe categorical columns",
        fr: "Décrire les colonnes catégorielles",
        template: 'mice.describe(___="object")',
        blanks: ["include"],
        hint: "Parameter that tells describe() which dtypes to include."
      },
      {
        title: "Access with .loc and .iloc",
        fr: "Accéder avec .loc et .iloc",
        template: '# label-based: protein of first mouse\nmice.___[0, "DYRK1A_N"]\n# position-based: row 0, column 1\nmice.___[0, 1]',
        blanks: ["loc", "iloc"],
        hint: "Labels vs integer positions."
      },
      {
        title: "Boolean filtering",
        fr: "Filtrage booléen",
        template: 'high = mice[mice["DYRK1A_N"] ___ 0.6]',
        blanks: [">"],
        hint: "Comparison operator for 'greater than'."
      },
      {
        title: "Group and aggregate",
        fr: "Grouper et agréger",
        template: 'mice.___("Genotype")[["DYRK1A_N", "BDNF_N"]].mean()',
        blanks: ["groupby"],
        hint: "Splits the data by a column before aggregating."
      },
      {
        title: "Boxplot grouped by category",
        fr: "Boxplot groupé par catégorie",
        template: 'fig, ax = plt.___(figsize=(6, 4))\nmice.boxplot(column="DYRK1A_N", by="Genotype", ax=ax)\nplt.show()',
        blanks: ["subplots"],
        hint: "Creates a Figure and an Axes."
      }
    ]
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "processing",
    title: "Data Processing for ML",
    fr: "Préparation des données pour le ML",
    icon: "⚙",
    blurb: "Train/test split, imputing, encoding, scaling, pipelines.",
    quiz: [
      {
        q: "What is the correct order of the ML pipeline?",
        fr: "Quel est l'ordre correct du pipeline ML ?",
        options: [
          "Fit model → split → preprocess → load",
          "pandas DataFrame → train/test split → preprocess → fit model",
          "Scale → predict → load → split",
          "Encode → fit model → load → split"
        ],
        a: 1
      },
      {
        q: "The golden rule of preprocessing is to…",
        fr: "La règle d'or du prétraitement est de…",
        options: [
          "fit on the test set",
          "always fit preprocessing on the training set only, then transform both train and test",
          "fit on the whole dataset before splitting",
          "never scale features"
        ],
        a: 1
      },
      {
        q: "For classification, why pass stratify=y to train_test_split?",
        fr: "Pour la classification, pourquoi passer stratify=y ?",
        options: [
          "To shuffle the data twice",
          "So the train/test class balance matches the full dataset",
          "To remove missing values",
          "To scale the target"
        ],
        a: 1
      },
      {
        q: "One-hot encoding is appropriate for which kind of categories?",
        fr: "L'encodage one-hot convient à quel type de catégories ?",
        options: [
          "Ordinal (ordered) categories",
          "Nominal (unordered) categories like red/green/blue",
          "Numeric columns",
          "Dates"
        ],
        a: 1
      },
      {
        q: "MinMaxScaler vs StandardScaler — which output do they produce?",
        fr: "MinMaxScaler vs StandardScaler — quelles sorties produisent-ils ?",
        options: [
          "Both produce [0,1]",
          "MinMaxScaler → [0,1]; StandardScaler → mean=0, std=1",
          "MinMaxScaler → mean=0; StandardScaler → [0,1]",
          "Both produce mean=0, std=1"
        ],
        a: 1
      },
      {
        q: "What is the advantage of a scikit-learn Pipeline?",
        fr: "Quel est l'avantage d'un Pipeline scikit-learn ?",
        options: [
          "It makes the model slower on purpose",
          "It chains preprocessing + estimator into one fit/predict, avoiding test-set leakage",
          "It deletes the test set",
          "It only works with images"
        ],
        a: 1
      }
    ],
    code: [
      {
        title: "Separate features and target, then split",
        fr: "Séparer features et cible, puis diviser",
        template: 'X = df.___("target", axis=1)\ny = df["target"]\nX_train, X_test, y_train, y_test = ___(\n    X, y, test_size=0.2, random_state=42\n)',
        blanks: ["drop", "train_test_split"],
        hint: "Remove the target column; sklearn's splitting function."
      },
      {
        title: "Impute missing values (learn on train only)",
        fr: "Imputer les valeurs manquantes (apprises sur le train)",
        template: 'imputer = SimpleImputer(strategy="___")  # mean of column\nimputer.___(df_train)\ntest_filled = imputer.___(df_test)',
        blanks: ["mean", "fit", "transform"],
        hint: "Strategy; learn parameters; apply them."
      },
      {
        title: "One-hot encode a categorical column",
        fr: "Encoder en one-hot une colonne catégorielle",
        template: 'encoder = OneHotEncoder(sparse_output=False)\nencoder.___(df_train[["colour"]])\ntest_encoded = encoder.___(df_test[["colour"]])',
        blanks: ["fit", "transform"],
        hint: "Learn the categories, then apply them."
      },
      {
        title: "Map ordinal categories to integers",
        fr: "Associer des catégories ordinales à des entiers",
        template: 'df["size_code"] = df["size"].___({"small": 0, "medium": 1, "large": 2})',
        blanks: ["map"],
        hint: "Series method that replaces values using a dict."
      },
      {
        title: "StandardScaler on train and test",
        fr: "StandardScaler sur train et test",
        template: 'scaler = StandardScaler()\nX_train_scaled = scaler.___(X_train)  # fit + transform\nX_test_scaled  = scaler.___(X_test)   # transform only',
        blanks: ["fit_transform", "transform"],
        hint: "First call fits AND transforms; second only transforms."
      },
      {
        title: "A scikit-learn Pipeline",
        fr: "Un Pipeline scikit-learn",
        template: 'pipe = Pipeline([\n    ("imputer", SimpleImputer(strategy="mean")),\n    ("scaler", StandardScaler()),\n    ("model", LogisticRegression(max_iter=10000)),\n])\npipe.___(X_train, y_train)',
        blanks: ["fit"],
        hint: "Runs every step on the training data."
      }
    ]
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "classification",
    title: "Classification",
    fr: "Classification",
    icon: "🎯",
    blurb: "kNN, Decision Trees, Random Forests, accuracy & confusion matrix.",
    quiz: [
      {
        q: "Supervised classification learns from…",
        fr: "La classification supervisée apprend à partir de…",
        options: [
          "unlabeled data",
          "labeled data to predict categories",
          "random noise",
          "only numeric targets (regression)"
        ],
        a: 1
      },
      {
        q: "k-Nearest Neighbors is described as…",
        fr: "k-plus-proches-voisins est décrit comme…",
        options: [
          "a parametric method that learns weights",
          "a non-parametric method that memorizes data and computes distances at prediction time",
          "a deep neural network",
          "a clustering algorithm"
        ],
        a: 1
      },
      {
        q: "Why must you scale features before kNN?",
        fr: "Pourquoi faut-il mettre à l'échelle avant kNN ?",
        options: [
          "To speed up training",
          "kNN uses distances; a large-range feature would dominate the distance calculation",
          "To remove missing values",
          "Scaling is not needed for kNN"
        ],
        a: 1
      },
      {
        q: "How does a small k affect the kNN decision boundary?",
        fr: "Comment un petit k affecte-t-il la frontière de décision kNN ?",
        options: [
          "Smoother boundaries (underfitting)",
          "Jagged boundaries (overfitting)",
          "No effect",
          "It removes the boundary"
        ],
        a: 1
      },
      {
        q: "A Random Forest is…",
        fr: "Une forêt aléatoire est…",
        options: [
          "a single deep decision tree",
          "many trees trained on random subsets, combined by majority vote",
          "a scaling method",
          "the same as kNN"
        ],
        a: 1
      },
      {
        q: "In medicine, why is accuracy alone misleading on imbalanced data?",
        fr: "En médecine, pourquoi l'exactitude seule est-elle trompeuse ?",
        options: [
          "It is always 100%",
          "A model predicting the majority class can score high accuracy while missing every positive (recall = 0)",
          "Accuracy cannot be computed",
          "It only works for regression"
        ],
        a: 1
      },
      {
        q: "Which classifier needs feature scaling?",
        fr: "Quel classifieur nécessite une mise à l'échelle ?",
        options: ["Decision Tree", "Random Forest", "kNN", "None of them"],
        a: 2
      },
      {
        q: "A confusion matrix is more informative than accuracy because it…",
        fr: "Une matrice de confusion est plus informative car elle…",
        options: [
          "shows where the model makes mistakes, not just how many",
          "is always square",
          "trains faster",
          "removes false positives"
        ],
        a: 0
      }
    ],
    code: [
      {
        title: "kNN classifier with 5 neighbors",
        fr: "Classifieur kNN avec 5 voisins",
        template: 'from sklearn.neighbors import KNeighborsClassifier\nknn = KNeighborsClassifier(n_neighbors=___)\nknn.___(X_train_scaled, y_train)\ny_pred = knn.___(X_test_scaled)',
        blanks: ["5", "fit", "predict"],
        hint: "Number of neighbors; train; then predict."
      },
      {
        title: "Decision Tree (max_depth = 5)",
        fr: "Arbre de décision (max_depth = 5)",
        template: 'dt = DecisionTreeClassifier(max_depth=___, random_state=42)\ndt.fit(X_train_scaled, y_train)\ny_pred = dt.predict(X_test_scaled)',
        blanks: ["5"],
        hint: "Maximum depth shown on the slide."
      },
      {
        title: "Random Forest (100 trees)",
        fr: "Forêt aléatoire (100 arbres)",
        template: 'rf = RandomForestClassifier(n_estimators=___, random_state=42)\nrf.fit(X_train_scaled, y_train)\ny_pred = rf.predict(X_test_scaled)',
        blanks: ["100"],
        hint: "Number of trees in the forest."
      },
      {
        title: "Evaluation metrics",
        fr: "Métriques d'évaluation",
        template: 'from sklearn.metrics import accuracy_score\naccuracy = ___(y_test, y_pred)\nprint(f"Accuracy: {accuracy:.1%}")',
        blanks: ["accuracy_score"],
        hint: "All sklearn metrics follow metric(y_true, y_pred)."
      },
      {
        title: "Feature importances",
        fr: "Importance des variables",
        template: 'importances = rf.___',
        blanks: ["feature_importances_"],
        hint: "Attribute (with trailing underscore) of fitted trees/forests."
      }
    ]
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "interpreting",
    title: "Interpreting Data",
    fr: "Interprétation des données",
    icon: "📊",
    blurb: "Statistical learning, MSE, overfitting, t-test, ANOVA.",
    quiz: [
      {
        q: "In Y = f(X) + e, what does e represent?",
        fr: "Dans Y = f(X) + e, que représente e ?",
        options: [
          "the systematic information",
          "a random error term, independent of X, with mean 0",
          "the predictor",
          "the slope"
        ],
        a: 1
      },
      {
        q: "What does overfitting mean?",
        fr: "Que signifie le surapprentissage ?",
        options: [
          "Low training MSE but high test MSE — the model learns noise",
          "High training MSE and high test MSE",
          "The model is too simple",
          "There is no test set"
        ],
        a: 0
      },
      {
        q: "The principle of parsimony favors…",
        fr: "Le principe de parcimonie privilégie…",
        options: [
          "the most complex model",
          "the simplest adequate explanation (fewer parameters)",
          "models with no data",
          "ignoring the test MSE"
        ],
        a: 1
      },
      {
        q: "Cross-validation is…",
        fr: "La validation croisée est…",
        options: [
          "a way to delete outliers",
          "a resampling method using different parts of the data to train and test in multiple iterations",
          "a scaling technique",
          "a plotting library"
        ],
        a: 1
      },
      {
        q: "A t-test answers which question?",
        fr: "Un test t répond à quelle question ?",
        options: [
          "Is the difference between the means of TWO groups statistically significant?",
          "Are more than two group means equal?",
          "What is the correlation?",
          "Which features matter most?"
        ],
        a: 0
      },
      {
        q: "ANOVA generalizes the t-test to…",
        fr: "L'ANOVA généralise le test t à…",
        options: [
          "two groups only",
          "more than two groups",
          "regression",
          "clustering"
        ],
        a: 1
      },
      {
        q: "A small p-value (< 0.05) means…",
        fr: "Une petite p-value (< 0.05) signifie…",
        options: [
          "we accept the null hypothesis",
          "we can reject the null hypothesis (significant difference)",
          "the data is missing",
          "the model overfits"
        ],
        a: 1
      },
      {
        q: "Rule of thumb for data per parameter in complex models?",
        fr: "Règle empirique pour le nombre de données par paramètre ?",
        options: [
          "1 sample per parameter",
          "at least ~10 samples per parameter",
          "exactly 2 samples total",
          "no rule exists"
        ],
        a: 1
      }
    ],
    code: [
      {
        title: "Independent two-sample t-test (SciPy)",
        fr: "Test t à deux échantillons indépendants",
        template: 'from scipy import stats\nt_stat, p_value = stats.___(group_a, group_b)',
        blanks: ["ttest_ind"],
        hint: "SciPy function for two independent groups."
      },
      {
        title: "One-way ANOVA (SciPy)",
        fr: "ANOVA à un facteur (SciPy)",
        template: 'from scipy import stats\nf_stat, p_value = stats.___(treatment_1, treatment_2, treatment_3)',
        blanks: ["f_oneway"],
        hint: "SciPy one-way ANOVA function."
      },
      {
        title: "ANOVA table with statsmodels",
        fr: "Table ANOVA avec statsmodels",
        template: 'from statsmodels.formula.api import ols\nmodel = ols("score ~ C(treatment)", data=data).___()\nanova_table = sm.stats.anova_lm(model)',
        blanks: ["fit"],
        hint: "After building the OLS model, you call this."
      },
      {
        title: "Two-way ANOVA with interaction",
        fr: "ANOVA à deux facteurs avec interaction",
        template: 'model = ols("weight_loss ~ C(diet) ___ C(exercise)", data=data).fit()',
        blanks: ["*"],
        hint: "Shorthand operator for main effects + interaction."
      }
    ]
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "regression",
    title: "Regression",
    fr: "Régression",
    icon: "📈",
    blurb: "Pearson r, OLS, formulas, R², polynomial regression, AIC.",
    quiz: [
      {
        q: "The Pearson correlation coefficient R…",
        fr: "Le coefficient de corrélation de Pearson R…",
        options: [
          "ranges from 0 to 1 with no direction",
          "ranges from -1 to +1; the sign gives the direction of the linear relationship",
          "is always positive",
          "measures variance explained by a model"
        ],
        a: 1
      },
      {
        q: "Pearson r is the ratio between…",
        fr: "Le r de Pearson est le rapport entre…",
        options: [
          "the covariance of X and Y and the product of their standard deviations",
          "the mean of X and the mean of Y",
          "MSE and AIC",
          "slope and intercept"
        ],
        a: 0
      },
      {
        q: "How are the b coefficients of a linear model found?",
        fr: "Comment trouve-t-on les coefficients b d'un modèle linéaire ?",
        options: [
          "By guessing",
          "Ordinary Least Squares — minimizing the squared differences (MSE)",
          "By maximizing R",
          "By cross-validation only"
        ],
        a: 1
      },
      {
        q: "What does R-squared measure?",
        fr: "Que mesure le R² ?",
        options: [
          "The direction of correlation",
          "The proportion of variance explained by the model (0 to 1)",
          "The number of predictors",
          "The slope"
        ],
        a: 1
      },
      {
        q: "Why is R² alone a poor criterion for model selection?",
        fr: "Pourquoi le R² seul est-il un mauvais critère de sélection ?",
        options: [
          "It is always 0",
          "Adding any parameter can only increase R², even useless ones",
          "It cannot be computed",
          "It decreases with more data"
        ],
        a: 1
      },
      {
        q: "For the AIC criterion…",
        fr: "Pour le critère AIC…",
        options: [
          "the higher the better",
          "the lower the better (penalizes complexity)",
          "it ignores the number of parameters",
          "it equals R²"
        ],
        a: 1
      },
      {
        q: "Which is NOT an assumption of the linear model?",
        fr: "Laquelle N'EST PAS une hypothèse du modèle linéaire ?",
        options: [
          "Normality of residuals",
          "Constant variance of e",
          "Predictors must be strongly correlated with each other",
          "Independent observations"
        ],
        a: 2
      }
    ],
    code: [
      {
        title: "Pearson correlation (SciPy)",
        fr: "Corrélation de Pearson (SciPy)",
        template: 'from scipy import stats\nstats.___(df["bp"], df["MW"])',
        blanks: ["pearsonr"],
        hint: "SciPy function for Pearson's r."
      },
      {
        title: "Correlation matrix for several columns",
        fr: "Matrice de corrélation pour plusieurs colonnes",
        template: 'df[["bp", "MW", "carbons", "degree"]].___()',
        blanks: ["corr"],
        hint: "DataFrame method returning pairwise Pearson correlations."
      },
      {
        title: "Simple linear regression (statsmodels)",
        fr: "Régression linéaire simple (statsmodels)",
        template: 'import statsmodels.formula.api as smf\nmodel = smf.___(formula="bp ~ MW", data=df)\nresult = model.fit()\nprint(result.summary())',
        blanks: ["ols"],
        hint: "Ordinary Least Squares from the formula API."
      },
      {
        title: "Multiple regression — add a predictor",
        fr: "Régression multiple — ajouter un prédicteur",
        template: 'model = smf.ols(formula="bp ~ MW ___ carbons", data=df)',
        blanks: ["+"],
        hint: "Operator that adds another predictor in a formula."
      },
      {
        title: "Polynomial term in the formula",
        fr: "Terme polynomial dans la formule",
        template: 'model = smf.ols(formula="bp ~ MW + I(MW___2)", data=df)',
        blanks: ["**"],
        hint: "Python power operator inside I(...)."
      },
      {
        title: "Retrieve coefficients and R²",
        fr: "Récupérer les coefficients et le R²",
        template: 'b  = result.___       # coefficients\nr2 = result.___    # R-squared',
        blanks: ["params", "rsquared"],
        hint: "Two attributes of a fitted statsmodels result."
      }
    ]
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "timeseries",
    title: "Time Series",
    fr: "Séries temporelles",
    icon: "⏱",
    blurb: "datetime, resampling, rolling averages, Z-score anomalies.",
    quiz: [
      {
        q: "A time series is decomposed into…",
        fr: "Une série temporelle se décompose en…",
        options: [
          "Trend + Seasonality + Noise",
          "Mean + Median + Mode",
          "Slope + Intercept",
          "Train + Test + Validation"
        ],
        a: 0
      },
      {
        q: "The Nyquist–Shannon theorem says to sample at…",
        fr: "Le théorème de Nyquist–Shannon dit d'échantillonner à…",
        options: [
          "the same rate as the signal frequency",
          "at least 2 × the signal frequency",
          "half the signal frequency",
          "any rate you like"
        ],
        a: 1
      },
      {
        q: "Difference between resampling and a rolling average?",
        fr: "Différence entre rééchantillonnage et moyenne glissante ?",
        options: [
          "They are identical",
          "Resampling changes the time resolution; rolling average smooths using a window without reducing points",
          "Rolling average changes resolution; resampling smooths",
          "Both delete data"
        ],
        a: 1
      },
      {
        q: "Why prefer a datetime index?",
        fr: "Pourquoi préférer un index datetime ?",
        options: [
          "It uses less memory only",
          "It enables easy date selection, resampling, and rolling statistics",
          "It removes missing values",
          "It is required for scaling"
        ],
        a: 1
      },
      {
        q: "A point with |Z| > 3 is flagged as an anomaly because…",
        fr: "Un point avec |Z| > 3 est marqué anomalie car…",
        options: [
          "it lies beyond 3 standard deviations (~0.3% under a normal distribution)",
          "it is the mean",
          "it is missing",
          "Z-scores cannot exceed 3"
        ],
        a: 0
      },
      {
        q: "Why use a ROLLING Z-score instead of a global one?",
        fr: "Pourquoi un Z-score GLISSANT plutôt que global ?",
        options: [
          "It is faster only",
          "Global Z-scores assume stationarity; a rolling window adapts to local mean/std when the baseline drifts",
          "It needs no window",
          "It removes seasonality"
        ],
        a: 1
      }
    ],
    code: [
      {
        title: "Build a datetime column",
        fr: "Construire une colonne datetime",
        template: 'df["date"] = pd.___(df[["year", "month", "day"]])',
        blanks: ["to_datetime"],
        hint: "Pandas function converting to a datetime type."
      },
      {
        title: "Set the datetime as index",
        fr: "Définir le datetime comme index",
        template: 'data = data.___("date")',
        blanks: ["set_index"],
        hint: "DataFrame method to use a column as the index."
      },
      {
        title: "Resample daily to monthly mean",
        fr: "Rééchantillonner du jour au mois (moyenne)",
        template: 'monthly = daily.___("ME").mean()',
        blanks: ["resample"],
        hint: "Method that changes the time resolution; 'ME' = month end."
      },
      {
        title: "30-day rolling average",
        fr: "Moyenne glissante sur 30 jours",
        template: 'smooth_30 = daily.___(window=30).mean()',
        blanks: ["rolling"],
        hint: "Method that applies a moving window."
      },
      {
        title: "Threshold filtering (boolean indexing)",
        fr: "Filtrage par seuil (indexation booléenne)",
        template: 'alerts = df[df["pH"] ___ 6.0]',
        blanks: ["<"],
        hint: "Operator: pH BELOW 6.0."
      },
      {
        title: "Rolling Z-score anomaly flag",
        fr: "Détection d'anomalie par Z-score glissant",
        template: 'sensor["z_score"] = (sensor["temperature"] - sensor["rolling_mean"]) / sensor["rolling_std"]\nsensor["anomaly"] = sensor["z_score"].___() > 3',
        blanks: ["abs"],
        hint: "Take the absolute value before comparing to 3."
      }
    ]
  },

  /* ----------------------------------------------------------------------- */
  {
    id: "unsupervised",
    title: "Unsupervised Learning",
    fr: "Apprentissage non supervisé",
    icon: "🧩",
    blurb: "PCA, K-Means, explained variance, the scale→PCA→K-Means pipeline.",
    quiz: [
      {
        q: "Unsupervised learning differs from supervised in that it…",
        fr: "L'apprentissage non supervisé diffère du supervisé car il…",
        options: [
          "uses labels to predict",
          "has no labels — the goal is to discover structure in the data",
          "always uses kNN",
          "requires a test set"
        ],
        a: 1
      },
      {
        q: "What does PCA do?",
        fr: "Que fait l'ACP (PCA) ?",
        options: [
          "Classifies points by majority vote",
          "Finds a smaller set of axes (principal components) that preserve as much spread as possible",
          "Fills missing values",
          "Computes p-values"
        ],
        a: 1
      },
      {
        q: "The first principal component (PC1) points…",
        fr: "La première composante principale (PC1) pointe…",
        options: [
          "perpendicular to the data",
          "along the direction of maximum variance (longest axis of the cloud)",
          "toward the mean",
          "randomly"
        ],
        a: 1
      },
      {
        q: "Why standardize before PCA and K-Means?",
        fr: "Pourquoi standardiser avant l'ACP et K-Means ?",
        options: [
          "To add labels",
          "These methods are distance/variance based; large-magnitude features would dominate",
          "To remove duplicates",
          "It is optional and never needed"
        ],
        a: 1
      },
      {
        q: "The explained variance ratio tells you…",
        fr: "Le ratio de variance expliquée indique…",
        options: [
          "how much spread each principal component captures",
          "the number of clusters",
          "the p-value",
          "the slope of the regression"
        ],
        a: 0
      },
      {
        q: "K-Means tries to minimize…",
        fr: "K-Means cherche à minimiser…",
        options: [
          "the number of clusters",
          "the total squared distance (inertia J) from points to their centroids",
          "the explained variance",
          "the p-value"
        ],
        a: 1
      },
      {
        q: "What is the standard unsupervised pipeline taught?",
        fr: "Quel est le pipeline non supervisé standard enseigné ?",
        options: [
          "label → train → predict",
          "scale → PCA → K-Means → plot",
          "split → fit → score",
          "encode → drop → fillna"
        ],
        a: 1
      }
    ],
    code: [
      {
        title: "Standardize before PCA / K-Means",
        fr: "Standardiser avant ACP / K-Means",
        template: 'from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.___(df)',
        blanks: ["fit_transform"],
        hint: "One call that fits and transforms."
      },
      {
        title: "Reduce to 2 components with PCA",
        fr: "Réduire à 2 composantes avec l'ACP",
        template: 'from sklearn.decomposition import PCA\npca = PCA(n_components=___)\nX_pca = pca.___(X_scaled)',
        blanks: ["2", "fit_transform"],
        hint: "Number of components for a 2D plot; fit+transform."
      },
      {
        title: "Read the variance kept",
        fr: "Lire la variance conservée",
        template: 'print(f"Variance kept: {pca.___.sum():.1%}")',
        blanks: ["explained_variance_ratio_"],
        hint: "PCA attribute (trailing underscore) summing to total variance."
      },
      {
        title: "K-Means with 2 clusters",
        fr: "K-Means avec 2 clusters",
        template: 'from sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=___, random_state=42, n_init=10)\nlabels = kmeans.___(X_scaled)',
        blanks: ["2", "fit_predict"],
        hint: "Number of clusters; one call that fits AND returns labels."
      },
      {
        title: "Inspect the inertia",
        fr: "Examiner l'inertie",
        template: 'print(f"Inertia (J): {kmeans.___:.1f}")',
        blanks: ["inertia_"],
        hint: "KMeans attribute (trailing underscore) for total squared distance."
      }
    ]
  }
];
