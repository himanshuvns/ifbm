# Indian Football Bachao Movement --- Website Brief

## 1. Project Overview

**Project name:** Indian Football Bachao Movement

**Website purpose:**\
Create a simple, professional, mobile-first website for the Indian
Football Bachao Movement. The website should act as the official digital
home of the movement and complement its Instagram presence.

The website should communicate: - What the movement is - Why Indian
football needs attention - What the movement stands for - How people can
join/support the movement - The latest campaign content - Basic movement
statistics, including a live Instagram follower count

This is **Version 1 (MVP)**. Keep the product simple. Do not build a
complex social network, e-commerce platform, forum, payment system, or
user dashboard in V1.

------------------------------------------------------------------------

# 2. Core Message

The website should communicate the following idea:

> **Indian football deserves better.**

Supporting message:

> We don't lack talent.\
> We don't lack passion.\
> So what are we lacking?

The tone should be: - Passionate - Positive - Bold - Credible -
Community-driven - Constructive rather than aggressive - Focused on
Indian football

Avoid making unsupported accusations against individuals or
organizations.

------------------------------------------------------------------------

# 3. Target Audience

Primary audience: - Indian football fans - Young football supporters -
Indian football community members - Grassroots football supporters -
Players and aspiring players - Coaches and academies - People who want
Indian football to improve

Secondary audience: - Journalists - Football clubs - Football
organizations - Potential volunteers - Potential partners/sponsors

------------------------------------------------------------------------

# 4. V1 Website Scope

The first version should be a clean, responsive website with the
following sections:

1.  Home / Hero
2.  About the Movement
3.  Why Indian Football
4.  Our Vision / What We Want
5.  Movement Statistics
6.  Join the Movement
7.  Latest Campaign / Instagram
8.  Take Action
9.  Contact
10. Footer

The website can initially be a single-page experience with smooth
scrolling.

------------------------------------------------------------------------

# 5. Homepage Structure

## 5.1 Header

Header should contain:

-   Movement logo
-   Navigation links:
    -   Home
    -   About
    -   Why Indian Football
    -   Our Vision
    -   Join Us
    -   Contact
-   Primary CTA:
    -   **JOIN THE MOVEMENT 🇮🇳**

On mobile: - Hamburger menu - Sticky header

The header should remain simple and uncluttered.

------------------------------------------------------------------------

# 6. Hero Section

The hero section is the most important visual section.

Headline:

> **INDIAN FOOTBALL DESERVES BETTER.**

Supporting text:

> We don't lack talent.\
> We don't lack passion.\
> We believe Indian football needs a stronger ecosystem, better
> opportunities, and a clear long-term vision.

Primary CTA:

> **JOIN THE MOVEMENT 🇮🇳**

Secondary CTA:

> **WHY WE ARE HERE**

The hero should have strong football-related visual treatment.

Possible visual elements: - Indian flag-inspired visual language -
Football - Stadium/grass texture - Fans - Indian football imagery -
Movement logo

Do not make the design look like a generic corporate website.

------------------------------------------------------------------------

# 7. About the Movement

Section title:

> **WHAT IS INDIAN FOOTBALL BACHAO?**

Content:

Indian Football Bachao Movement is a community-driven initiative created
by football fans who believe Indian football has the talent, passion and
potential to grow.

The movement aims to: - Start meaningful conversations - Highlight
challenges in Indian football - Encourage better development - Support
grassroots football - Give football fans a collective voice - Promote
constructive discussion around the future of Indian football

Keep this section concise.

------------------------------------------------------------------------

# 8. Why Indian Football?

Section title:

> **WHY ARE WE HERE?**

Use visually appealing cards.

### Grassroots Development

Young players need better access to football, coaching, competitions and
development pathways.

### Youth Development

India needs stronger pathways from youth football to professional
football.

### Infrastructure

Players need access to quality grounds, training facilities and football
infrastructure.

### Sustainable Football Ecosystem

Clubs, leagues and football organizations need sustainable long-term
development.

### Opportunities for Players

Talented players need clearer opportunities to progress.

### Accountability & Transparency

Football fans deserve meaningful communication, transparency and
long-term planning.

Do not present specific statistics or accusations unless they are
verified and sourced.

------------------------------------------------------------------------

# 9. Our Vision

Section title:

> **OUR VISION FOR INDIAN FOOTBALL**

Main statement:

> A stronger Indian football ecosystem where talented players get
> opportunities, grassroots football is supported, clubs can grow
> sustainably, fans are heard, and Indian football has a clear long-term
> roadmap.

Display 5--6 vision cards:

-   Strong Grassroots
-   Better Youth Development
-   Better Infrastructure
-   Stronger Clubs & Leagues
-   Growth of Women's Football
-   Transparency & Accountability

------------------------------------------------------------------------

# 10. Movement Statistics

Create a visually prominent statistics section.

Example:

### 19,200+

Instagram Followers

### 28

Campaign Posts

### 1

Movement

Important:

The Instagram follower count must eventually be dynamic rather than
hardcoded.

Preferred architecture:

``` text
Instagram / Meta API
        ↓
Go Backend
        ↓
Cached Movement Statistics
        ↓
React/Next.js Frontend
```

The frontend must never expose Instagram/Meta access tokens.

The backend should retrieve the Instagram professional account's
follower count through the appropriate official Meta API and cache the
result.

The UI should display something like:

> **19,200+** Instagram Followers

Do not describe Instagram followers as confirmed movement supporters
unless the user has explicitly joined the movement.

Other statistics can initially be configurable/static and later be moved
to a database.

------------------------------------------------------------------------

# 11. Join the Movement

This is a primary conversion section.

Title:

> **JOIN THE MOVEMENT 🇮🇳**

Supporting text:

> If you believe Indian football can and should be better, be part of
> the conversation.

V1 form fields:

-   Name
-   Email
-   City
-   State
-   Optional: How would you like to contribute?

Contribution options: - Volunteer - Content creation - Research -
Photography / Video - Grassroots football - Local events - Social
media - Other

CTA:

> **JOIN THE MOVEMENT**

After successful submission:

> **Welcome to the movement! 🇮🇳**

For V1, authentication is NOT required.

The form should have: - Client-side validation - Backend validation -
Duplicate email handling - Success state - Error state - Basic spam
protection

------------------------------------------------------------------------

# 12. Latest Campaign / Instagram Section

Title:

> **LATEST FROM THE MOVEMENT**

Purpose: Show that the movement is active.

Display: - Latest Instagram posts/reels - Campaign videos - Important
announcements

CTA:

> **FOLLOW US ON INSTAGRAM**

The implementation should be designed so Instagram content can be
integrated without exposing private credentials.

If direct Instagram embedding/API integration is not configured yet, use
a clean placeholder/card layout that can be connected later.

------------------------------------------------------------------------

# 13. Take Action

Title:

> **YOU CAN HELP**

Display four simple action cards.

### Follow

Follow the movement on Instagram.

### Share

Share campaign content with other football fans.

### Volunteer

Help with content, research, events or community activities.

### Participate

Take part in discussions and future football-related activities.

Keep this section simple in V1.

------------------------------------------------------------------------

# 14. Contact

Title:

> **GET IN TOUCH**

Fields: - Name - Email - Message

CTA: \> SEND MESSAGE

Also show social media links.

The contact form should submit to the backend rather than exposing email
credentials in frontend code.

------------------------------------------------------------------------

# 15. Footer

Footer should include:

-   Movement logo/name
-   Short statement: \> Indian football deserves better. 🇮🇳
-   Navigation links
-   Instagram link
-   Contact
-   Privacy Policy
-   Terms / basic disclaimer if required
-   Copyright

------------------------------------------------------------------------

# 16. Design Direction

The design should feel like a football movement, not a corporate SaaS
website.

## Visual style

Use: - Strong typography - High contrast - Large headlines -
Football-inspired visual elements - Indian identity - Clean cards -
Subtle animations - Strong CTA buttons - Mobile-first layout

Avoid: - Excessive gradients - Excessive glassmorphism - Too many
animations - Generic startup UI - Overly complicated dashboards - Too
much text

## Suggested color direction

Primary: - Deep green / football green - White - Dark/black

Accent: - Saffron - Blue

Use Indian colors carefully. The website should look modern rather than
like a flag-themed template.

------------------------------------------------------------------------

# 17. Responsive Design

The website must work properly on:

-   Mobile phones
-   Tablets
-   Laptops
-   Desktop monitors

Mobile is especially important because most visitors are expected to
come from Instagram.

Design for approximately: - 360px+ - 768px+ - 1024px+ - 1440px+

------------------------------------------------------------------------

# 18. Accessibility

The website should: - Use semantic HTML - Have accessible buttons - Have
accessible forms - Provide alt text for meaningful images - Maintain
readable color contrast - Support keyboard navigation - Avoid animation
that makes content difficult to read

------------------------------------------------------------------------

# 19. SEO

V1 should include basic SEO.

Page title:

> Indian Football Bachao Movement \| Indian Football Deserves Better

Meta description:

> Indian Football Bachao Movement --- a community-driven initiative
> supporting the growth, development and future of Indian football.

Include: - Open Graph metadata - Twitter/X metadata - Favicon - Proper
heading hierarchy - Canonical URL placeholder - Sitemap - Robots.txt

------------------------------------------------------------------------

# 20. Technical Direction

Preferred frontend:

**React / Next.js**

Preferred backend:

**Golang**

Database:

**PostgreSQL or MongoDB**

For V1, keep the backend small.

Suggested backend responsibilities: - Movement statistics API -
Join-the-movement form - Contact form - Instagram follower count
integration - Basic health endpoint

Example API:

``` text
GET  /api/v1/stats
POST /api/v1/members
POST /api/v1/contact
GET  /api/v1/health
```

Stats response example:

``` json
{
  "instagram": {
    "username": "indianfootballbachaomovement",
    "followers": 19243
  },
  "movement": {
    "campaign_posts": 28
  }
}
```

------------------------------------------------------------------------

# 21. Instagram Integration

Instagram follower count is an important requirement but should be
implemented securely.

Requirements:

1.  Use the official Meta/Instagram API.
2.  Instagram credentials/tokens must remain on the backend.
3.  Never expose access tokens in frontend code.
4.  Do not scrape Instagram.
5.  Cache follower count to avoid unnecessary API calls.
6.  Handle API failures gracefully.
7.  If Instagram API is unavailable, show the last successfully cached
    count.
8.  Show when the statistic was last updated if useful.
9.  Do not block the website from loading if Instagram API is
    unavailable.

Example fallback:

``` text
19,243+
Instagram Followers

Updated recently
```

If the API is temporarily unavailable, continue showing the cached
value.

------------------------------------------------------------------------

# 22. Security

Follow basic security practices:

-   Never commit secrets
-   Use environment variables
-   Use secret management in production
-   Validate all backend inputs
-   Sanitize user-provided content
-   Rate-limit public forms
-   Add spam protection
-   Use HTTPS in production
-   Configure secure CORS
-   Do not expose internal errors to users
-   Do not expose Meta/Instagram credentials

------------------------------------------------------------------------

# 23. What NOT to Build in V1

Do not build:

-   User login
-   User profiles
-   Social feed
-   Chat
-   Forums
-   Payment gateway
-   Donations
-   Merchandise store
-   Complex admin dashboard
-   Academy marketplace
-   Player marketplace
-   Full football news CMS
-   Advanced analytics
-   Mobile app

These can be future phases.

------------------------------------------------------------------------

# 24. Future Roadmap

Potential V2 features:

-   Admin dashboard
-   Movement member management
-   Local chapters
-   Events
-   Fan stories
-   Football academy directory
-   Football ground directory
-   Polls
-   Campaign/petition system
-   Newsletter
-   News and analysis
-   Football statistics
-   Interactive India football map

Potential V3:

-   User accounts
-   Community profiles
-   Local football communities
-   Player/academy ecosystem
-   Event management
-   Donations/merchandise if required
-   Advanced football data

------------------------------------------------------------------------

# 25. Success Criteria for V1

The website is successful when:

1.  A new visitor understands the movement within 10 seconds.
2.  The website looks credible and professional.
3.  The website works extremely well on mobile.
4.  Visitors can easily join the movement.
5.  Visitors can easily find the movement's Instagram.
6.  The follower count can be dynamically updated through the backend.
7.  The website loads even if Instagram's API is temporarily
    unavailable.
8.  The site is easy to extend later.
9.  No secrets are exposed in frontend code.
10. The codebase is clean and maintainable.

------------------------------------------------------------------------

# 26. Development Principle

Build the website in small, reviewable stages.

Before writing code: 1. Understand this brief. 2. Ask only important
clarification questions. 3. Propose the implementation plan. 4. Propose
the UI structure. 5. Wait for approval before implementing major
changes.

Do not over-engineer V1.

The priority is:

**Beautiful + Fast + Simple + Credible + Mobile-first**

------------------------------------------------------------------------

# 27. Initial Homepage Copy

Use this as the starting content, but keep all text easy to change
later.

Hero:

> **INDIAN FOOTBALL DESERVES BETTER.**

> We don't lack talent.\
> We don't lack passion.\
> We believe it's time to ask the right questions and work towards a
> stronger future for Indian football.

CTA:

> **JOIN THE MOVEMENT 🇮🇳**

Secondary CTA:

> **WHY WE ARE HERE**

Movement statement:

> **We believe Indian football has enormous potential. The goal is not
> simply to criticize --- it is to start conversations, highlight
> problems, support solutions and give football fans a stronger
> collective voice.**

Closing CTA:

> **The future of Indian football belongs to all of us.**

> **Join the movement. 🇮🇳**

------------------------------------------------------------------------

# 28. Important Product Rule

This website represents a football movement/community.

The website should remain: - Fact-based - Respectful - Constructive -
Non-defamatory - Inclusive - Focused on improving Indian football

When presenting statistics, claims or criticism, prefer credible sources
and clearly distinguish facts, opinions and campaign positions.
