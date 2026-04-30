# Data Dictionary

This document describes the structure and meaning of each column in the retail user behavior dataset.

---

## Dataset Overview

The dataset contains session-based user interactions in an e-commerce environment.

Each row represents a single user interaction event within a session.

---

## Columns Description

### 1. session_id
- Description: Unique identifier for each user session
- Type: Categorical (string)
- Example: S000001

---

### 2. user_id
- Description: Unique identifier for each user
- Type: Categorical (string)
- Example: U000372

---

### 3. timestamp
- Description: Time when the event occurred (UTC)
- Type: Datetime
- Example: 2026-01-08T02:34:40Z

---

### 4. event_index
- Description: Order of the event within the session
- Type: Integer
- Example: 1, 2, 3...

---

### 5. user_action
- Description: Type of user interaction
- Type: Categorical

Possible values:
- view
- click
- add_to_cart
- wishlist
- purchase
- drop

---

### 6. product_id
- Description: Unique identifier of the product
- Type: Categorical

---

### 7. category
- Description: Product category
- Type: Categorical
- Example: Electronics, Groceries, Fashion

---

### 8. brand
- Description: Brand of the product
- Type: Categorical

---

### 9. price
- Description: Product price
- Type: Numerical (float)

---

### 10. channel
- Description: Platform used
- Type: Categorical

Possible values:
- web
- mobile
- app

---

### 11. device_type
- Description: User device
- Type: Categorical

Possible values:
- desktop
- mobile
- tablet
- android
- ios

---

### 12. region
- Description: Geographic region of the user
- Type: Categorical
- Example: US, UK, JP, CA

---

### 13. traffic_source
- Description: Source of the traffic
- Type: Categorical

Possible values:
- organic
- paid
- direct
- affiliate

---

### 14. session_duration
- Description: Duration of the session (seconds)
- Type: Numerical

---

### 15. pages_viewed
- Description: Number of pages viewed in the session
- Type: Integer

---

### 16. actions_count
- Description: Total number of actions in the session
- Type: Integer

---

### 17. converted
- Description: Indicates if the session resulted in a purchase
- Type: Binary (0 or 1)

---

### 18. dropped
- Description: Indicates if the user dropped off before converting
- Type: Binary (0 or 1)

---

## Notes

- The dataset is session-based, not transaction-based.
- Multiple rows can belong to the same session.
- Event order is defined by `event_index`.
- Conversion and drop-off are key target variables for modeling.