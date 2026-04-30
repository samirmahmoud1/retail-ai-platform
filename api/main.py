from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import json

app = FastAPI(
    title="RetailMind AI API",
    description="API for retail conversion prediction and analytics dashboard.",
    version="1.0.0"
)

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("../models/retail_conversion_model.pkl")

# Load model config
with open("../models/model_config.json", "r") as f:
    config = json.load(f)

THRESHOLD = config["best_threshold"]


@app.get("/")
def home():
    return {
        "message": "RetailMind AI API is running",
        "status": "success",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": True,
        "threshold": THRESHOLD
    }


@app.post("/predict")
def predict(data: dict):
    input_df = pd.DataFrame([data])

    probability = model.predict_proba(input_df)[0][1]
    prediction = int(probability >= THRESHOLD)

    if prediction == 1:
        label = "High Conversion Probability"
        recommendation = "User shows strong buying intent. Consider personalized offers or checkout support."
    else:
        label = "Low Conversion Probability"
        recommendation = "User may need more engagement. Consider product recommendations or retargeting."

    return {
        "conversion_probability": round(float(probability), 4),
        "conversion_percentage": round(float(probability) * 100, 2),
        "prediction": prediction,
        "label": label,
        "threshold": THRESHOLD,
        "recommendation": recommendation
    }


@app.get("/analytics/summary")
def analytics_summary():
    return {
        "total_events": 108584,
        "total_sessions": 18000,
        "total_users": 6806,
        "total_products": 1200,
        "conversion_rate": 3.87,
        "drop_off_rate": 12.71,
        "top_channel": "app",
        "top_device": "android",
        "top_region": "UK",
        "model_accuracy": 79.17,
        "model_recall": 90.37,
        "model_precision": 53.18,
        "model_roc_auc": 89.34
    }


@app.get("/analytics/funnel")
def analytics_funnel():
    return [
        {
            "stage": "View",
            "users": 44245,
            "conversion_rate": 100.0,
            "drop_rate": 0.0
        },
        {
            "stage": "Click",
            "users": 27735,
            "conversion_rate": 62.7,
            "drop_rate": 37.3
        },
        {
            "stage": "Add to Cart",
            "users": 11642,
            "conversion_rate": 41.9,
            "drop_rate": 58.0
        },
        {
            "stage": "Purchase",
            "users": 4203,
            "conversion_rate": 36.1,
            "drop_rate": 63.9
        }
    ]


@app.get("/analytics/actions")
def analytics_actions():
    return [
        {"action": "view", "count": 44245, "percentage": 40.75},
        {"action": "click", "count": 27735, "percentage": 25.54},
        {"action": "drop", "count": 13797, "percentage": 12.71},
        {"action": "add_to_cart", "count": 11642, "percentage": 10.72},
        {"action": "wishlist", "count": 6962, "percentage": 6.41},
        {"action": "purchase", "count": 4203, "percentage": 3.87}
    ]


@app.get("/analytics/channel")
def analytics_channel():
    return [
        {"channel": "app", "conversion_rate": 4.44},
        {"channel": "mobile", "conversion_rate": 3.71},
        {"channel": "web", "conversion_rate": 3.47}
    ]


@app.get("/analytics/device")
def analytics_device():
    return [
        {"device": "android", "conversion_rate": 4.08},
        {"device": "ios", "conversion_rate": 3.95},
        {"device": "desktop", "conversion_rate": 3.81},
        {"device": "tablet", "conversion_rate": 3.63}
    ]


@app.get("/analytics/region")
def analytics_region():
    return [
        {"region": "UK", "conversion_rate": 4.01},
        {"region": "JP", "conversion_rate": 4.00},
        {"region": "CA", "conversion_rate": 3.95},
        {"region": "BR", "conversion_rate": 3.94},
        {"region": "US", "conversion_rate": 3.91},
        {"region": "FR", "conversion_rate": 3.84},
        {"region": "AU", "conversion_rate": 3.78},
        {"region": "DE", "conversion_rate": 3.76},
        {"region": "IN", "conversion_rate": 3.64}
    ]


@app.get("/analytics/feature-importance")
def analytics_feature_importance():
    return [
        {"feature": "Cart-to-View Ratio", "importance": 39.7},
        {"feature": "Add to Cart Count", "importance": 28.1},
        {"feature": "Pre-Purchase Engagement Score", "importance": 9.9},
        {"feature": "Views", "importance": 3.2},
        {"feature": "Conversion Intent", "importance": 3.0},
        {"feature": "Clicks", "importance": 2.3},
        {"feature": "Time Spent", "importance": 1.9},
        {"feature": "Time per Action", "importance": 1.8},
        {"feature": "High Engagement", "importance": 1.4},
        {"feature": "Pre-Purchase Actions", "importance": 1.3}
    ]


@app.get("/analytics/model-comparison")
def analytics_model_comparison():
    return [
        {
            "model": "Logistic Regression",
            "accuracy": 80.39,
            "precision": 55.19,
            "recall": 85.26,
            "f1_score": 67.01,
            "roc_auc": 89.03
        },
        {
            "model": "Random Forest",
            "accuracy": 78.42,
            "precision": 52.10,
            "recall": 94.53,
            "f1_score": 67.17,
            "roc_auc": 89.34
        },
        {
            "model": "XGBoost",
            "accuracy": 81.89,
            "precision": 62.58,
            "recall": 55.89,
            "f1_score": 59.05,
            "roc_auc": 89.32
        },
        {
            "model": "Optimized Random Forest",
            "accuracy": 79.17,
            "precision": 53.18,
            "recall": 90.37,
            "f1_score": 66.96,
            "roc_auc": 89.34
        }
    ]


@app.get("/insights")
def insights():
    return [
        {
            "title": "Intent beats traffic",
            "description": "Cart-to-view ratio and add-to-cart actions are the strongest predictors of conversion."
        },
        {
            "title": "Mid-funnel friction is the biggest issue",
            "description": "The largest drop happens between click and add-to-cart, showing hesitation before commitment."
        },
        {
            "title": "App users convert best",
            "description": "The app has the highest conversion rate, suggesting a stronger and more optimized user experience."
        },
        {
            "title": "Mobile-first matters",
            "description": "Android and iOS outperform desktop and tablet, making mobile UX a key business priority."
        },
        {
            "title": "Behavior matters more than context",
            "description": "Device, region, and channel are less important than what users actually do inside the session."
        }
    ]