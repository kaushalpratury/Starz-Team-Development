# Stillwater Starz Team Development

## Project Overview
Stillwater Starz Team Development is a private web application used exclusively by Stillwater Starz Swim Team.

It replaces the Google Sheets currently used for scheduling private lessons.

The application is only used by:

- Parents
- Coaches
- Administrators

This is not a public website or SaaS product.

## Primary Goals

- Replace Google Sheets
- Make booking simple
- Reduce scheduling mistakes
- Give administrators complete control
- Give coaches an easy way to manage availability
- Give parents a simple booking experience

## User Roles

### Parent
Can:

- Create an account
- Manage swimmers
- Book private lessons
- Cancel lessons
- View upcoming lessons
- View previous lessons
- View coach directory
- Contact coaches by phone, text, or email
- Read announcements

Cannot:

- Edit coach schedules
- Edit system settings

### Coach
Can:

- View schedule
- Set availability
- Update profile
- View swimmer information for booked lessons
- Read announcements

Cannot:

- Modify system settings
- Modify other coach schedules

### Administrator
Full access.

Can manage:

- Parents
- Swimmers
- Coaches
- Lessons
- Announcements
- System settings
- Season settings
- Booking rules

## Business Rules

Private lessons normally occur during the summer season.

Default lesson time is 10:20 AM to 10:50 AM.

Administrators can change:

- lesson time
- lesson duration
- season dates
- booking rules
- registration dates

Initial registration may limit swimmers to one booking.

After the configured date parents may reserve any remaining openings.

Maximum swimmers per lesson is configurable.

Parents pay coaches outside the application.

No in-app messaging.

Parents contact coaches by phone, text, or email.

All rules should be configurable by administrators.

## Booking Rules

- During the initial registration period, each swimmer may only reserve one private lesson.
- After the configured registration date, parents may reserve any remaining available lesson slots.
- Administrators can configure both dates each season.
- Private lessons normally occur during the summer season, but administrators can enable or disable bookings at any time.
- Coaches control which days they are available.
- Parents should only see dates that are currently available.
- Once a lesson is booked, that availability is removed immediately.
- The application must prevent double-booking coaches.
- The application must prevent swimmers from being booked into overlapping lessons.
- The application should support up to two swimmers in a single private lesson when allowed by administrators.
- Parents may cancel lessons according to the cancellation policy configured by administrators.
- Administrators can override any booking rule.

## Coach Profiles

Each coach profile should contain:

- Full Name
- Profile Photo
- Coach Title
- Biography
- Phone Number
- Email Address
- Venmo
- Zelle
- Preferred Payment Method
- Lesson Price
- Active / Inactive Status

## Dashboard Philosophy

The application should feel like a modern internal management system.

Every dashboard should display summary cards instead of large tables whenever possible.

### Parent Dashboard

- Upcoming Lesson
- My Swimmers
- Announcements
- Quick Actions

### Coach Dashboard

- Today's Lessons
- Upcoming Schedule
- Availability
- Announcements

### Administrator Dashboard

- Today's Bookings
- Open Lesson Slots
- Active Coaches
- Active Parents
- Recent Announcements
- System Status

## Configuration Philosophy

No business rule should be hardcoded.

Administrators should be able to configure:

- Season Dates
- Registration Dates
- Lesson Time
- Lesson Duration
- Booking Limits
- Cancellation Policy
- Maximum Swimmers Per Lesson
- Coach Prices
- Coach Availability Rules
- Announcement Settings

Future rule changes should require configuration instead of code changes.

## Functional Requirements

- Support parent, coach, and administrator access
- Allow parents to manage swimmer profiles
- Allow parents to book and cancel private lessons
- Allow parents to view upcoming and previous lessons
- Allow coaches to manage availability
- Allow coaches to view their schedules and lesson swimmer details
- Allow administrators to manage users, lessons, announcements, season settings, and booking rules
- Provide a coach directory with contact details
- Provide announcement visibility to all user roles

## Non-Functional Requirements

- Private and access-controlled for internal team use only
- Mobile-first and easy to use on phones and tablets
- Fast enough for quick scheduling tasks
- Simple, clean, and low-friction UI
- Reliable and consistent booking behavior
- Maintainable configuration-driven business rules

## Permissions

- Parents can only manage their own account, swimmers, bookings, and profile-level actions
- Coaches can only manage their own availability and view their own booked lesson context
- Administrators can manage all records and system settings
- No role may modify another coach's schedule unless they are an administrator
- No role outside administrators may change booking rules, season dates, or registration settings

## Design Philosophy

The application should feel like a professional internal team management system.

It should match the Stillwater Starz branding.

Use:

- navy blue
- red
- white

Design should be modern, clean, mobile-first, and intentionally simple.

Avoid marketing language.

Avoid unnecessary animations.

Prioritize speed and simplicity.

The official logo is the primary branding reference. Its visual identity should guide future UI decisions, including:

- primary colors
- secondary colors
- typography style
- overall visual identity

Future UI should feel like an official Stillwater Starz product, not a generic web application.

## Future Features
