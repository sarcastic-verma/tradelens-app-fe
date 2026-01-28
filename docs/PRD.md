# TRADELENS — PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. Product Vision

TradeLens is a neutral marketplace where Indian traders discover, compare and access independent trading Creators based on verified performance, SEBI status and community feedback.

**TradeLens does not provide investment advice.**
It provides transparency, accountability, and access infrastructure.

## 2. User Types

### Members
Retail traders who want to follow trading creators.

### Creators
Independent traders who publish trade ideas and charge for access.

### Admin
TradeLens staff.

## 3. Core Objects

### Creator
- **id**
- **name**
- **photo**
- **bio**
- **instruments** (CASH_EQUITY, STOCK_FUTURES, STOCK_OPTIONS, INDEX_FUTURES, INDEX_OPTIONS, COMMODITIES, CURRENCY_DERIVATIVES)
- **strategies** (INTRADAY, SWING, POSITIONAL, OPTIONS_SELLING, OPTIONS_BUYING, SCALPING, TREND_FOLLOWING, MEAN_REVERSION, EVENT_BASED)
- **SEBI_status** (VERIFIED / UNVERIFIED)
- **SEBI_reg_no**
- **risk_profile** (LOW, MEDIUM, HIGH)
- **capital_required_bucket** (SMALL, MEDIUM, LARGE)
- **joined_at**

### Member
- **id**
- **email**
- **joined_at**

### TradeIdea
- **id**
- **creator_id**
- **instrument_type** (INDEX_OPTIONS, CASH_EQUITY, etc)
- **symbol**
- **entry**
- **objective**
- **risk_limit**
- **expiry**
- **thesis** (markdown)
- **published_at**
- **status** (ACTIVE, REACHED, INVALIDATED, EXPIRED)

### AccessPlan
- **id**
- **creator_id**
- **name** (Monthly, Quarterly, Pro, etc)
- **price**
- **billing_cycle** (MONTHLY, QUARTERLY)
- **is_active**
- **created_at**

### Subscription
- **id**
- **member_id**
- **access_plan_id**
- **start_at**
- **end_at**
- **status** (ACTIVE, CANCELLED, EXPIRED)

### TradeOutcome
- **id**
- **trade_id**
- **entry_hit_at**
- **exit_price**
- **outcome** (REACHED, INVALIDATED, EXPIRED)
- **pnl**
- **validated_at**

### CreatorWallet
- **creator_id**
- **pending_balance**
- **available_balance**
- **lifetime_earned**

### Payout
- **id**
- **creator_id**
- **amount**
- **status** (PENDING, COMPLETED, FAILED)
- **requested_at**
- **processed_at**

### Member Features

#### A. Creator Discovery
Members can:
- Search creators
- Filter by:
    - Instruments
    - Risk
    - Strategy
    - Capital(ranges)
    - Subscription Price
    - SEBI status
    - Performance
    - Holding period
    - Performance (30d, 90d, all-time)

#### B. Creator Profile
Shows:
- Bio
- Strategy
- SEBI status
- Performance stats
- Access Plans
- Reviews
- **Get Access** button

#### C. Trade Feed
After subscribing:
- See all trade ideas
- See thesis for each trade
- See live status

#### D. My Trade Performance
Members see:
- All trades during their access
- PnL
- Hit rate
- Drawdown
- Comparison vs creator

#### E. Community
- Threaded comments per trade
- Likes
- Reports
- Moderation

### 4. Creator Features

#### A. Creator Onboarding
- KYC
- Bank account
- Optional SEBI verification

#### B. Publish Trade Ideas
Creators must submit:
- Entry
- Objective
- Risk limit
- Expiry
- Thesis (why this trade)

Once published:
- **Cannot be edited**
- **Creator can add follow-up comments**

#### C. Screenshot & Leak Protection
- User-specific watermark on every trade
- Blurred view on tab switch
- Disabled text selection
- Screenshot warning (where supported)

#### D. Performance Dashboard
Creators see:
- Hit rate
- Drawdown
- PnL
- Member retention
- Monthly earnings

#### E. Creator Wallet
- Pending balance
- Available balance
- Withdraw history
- Withdraw button
- **Funds unlock after 7 days.**
- **Negative balance allowed (to handle refunds & chargebacks)**

### 5. Payments & Payouts
- Razorpay handles all payments
- TradeLens takes 20%
- Creator gets 80%
- Funds go to creator wallet
- Withdrawals to bank
- Refunds deduct from pending balance.

### 6. Trade Verification Engine
For every trade:
- Pull market price
- Detect entry hit
- Detect target or risk limit
- Set outcome
- Update creator & member stats
- **Runs via background jobs.**

### 7. Admin Panel
Admins can:
- Approve creators
- Verify SEBI
- Suspend creators
- Remove trades
- Handle disputes

### 8. Tech Stack

**Frontend:**
- Next.js
- Tailwind

**Backend:**
- NestJS
- Drizzle ORM

**Database:**
- PostgreSQL

**Queues:**
- BullMQ + Redis

**Payments:**
- Razorpay

**Market Data:**
- Zerodha / TrueData / Fyers /

**Hosting:**
- Vercel (FE)
- Railway / AWS (BE)
- Supabase (DB)

### 9. Legal Positioning

**TradeLens:**
- Does not give advice
- Does not execute trades
- Is a technology platform
- Only displays creator content and performance

**Creators:**
- Are independent educators   