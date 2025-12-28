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
- **markets**
- **strategy**
- **SEBI_status** (verified / unverified)
- **SEBI_reg_no**
- **risk_profile**
- **capital_required**
- **pricing**
- **performance_stats**
- **payout_wallet**

### Member
- **id**
- **email**
- **active_access_plans**
- **joined_trades**
- **personal_trade_performance**

### Trade Idea
- **id**
- **creator_id**
- **symbol**
- **entry**
- **objective**
- **risk_limit**
- **expiry**
- **thesis** (markdown)
- **timestamp**
- **status** (active / reached / invalidated / expired)

### Access Plan
- **creator_id**
- **price**
- **duration**
- **active_members**

### Subscription
- **member_id**
- **creator_id**
- **start**
- **end**
- **status**

### Trade Outcome
- **trade_id**
- **entry_hit**
- **exit_price**
- **outcome**
- **pnl**
- **validated_at**

### Member Features

#### A. Creator Discovery
Members can:
- Search creators
- Filter by:
    - Market
    - Risk
    - Capital
    - Price
    - SEBI status
    - Performance

#### B. Creator Profile
Shows:
- Bio
- Strategy
- SEBI status
- Performance stats
- Pricing
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

#### C. Screenshot & Leak Protection
- User-specific watermark on every trade
- Copy protection
- Trade locks after expiry

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