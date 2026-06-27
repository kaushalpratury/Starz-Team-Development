# Firestore Database Design

The database should be normalized, scalable, and easy to maintain.

## Collections

### users
Stores all authenticated users.

Fields:

- uid
- role (parent, coach, admin)
- firstName
- lastName
- email
- phone
- createdAt
- updatedAt
- active

Why it exists:

- Provides the canonical authentication-linked user record
- Supports role-based access control
- Stores shared account information used across the application

### swimmers
Fields:

- swimmerId
- parentId
- firstName
- lastName
- dateOfBirth
- abilityLevel
- notes
- active

Why it exists:

- Stores child swimmer profiles separately from parent accounts
- Supports one parent having multiple swimmers
- Keeps booking data normalized by referencing swimmer records instead of duplicating swimmer details

### coaches
Fields:

- coachId
- userId
- firstName
- lastName
- title
- biography
- phone
- email
- venmo
- zelle
- lessonPrice
- profilePhoto
- active

Why it exists:

- Stores coach-specific profile and payment details separately from the base user record
- Keeps public-facing coach profile data organized and editable without changing authentication data
- Supports coach directory, booking context, and admin management

### availability
Fields:

- availabilityId
- coachId
- date
- startTime
- endTime
- available
- maxSwimmers

Why it exists:

- Stores coach availability as discrete bookable time slots
- Allows the system to show only currently available dates and times
- Makes it easy to remove availability immediately after booking

### bookings
Fields:

- bookingId
- availabilityId
- coachId
- parentId
- swimmerIds
- lessonDate
- startTime
- endTime
- status
- paymentStatus
- createdAt

Status values:

- booked
- cancelled
- completed

Why it exists:

- Stores each lesson reservation as the source of truth for booking history
- Links each booking to the exact availability slot it came from
- Links parents, coaches, and swimmers without duplicating profile data
- Supports active, cancelled, and completed lesson tracking

### notifications
Fields:

- notificationId
- userId
- title
- message
- type
- read
- createdAt

Examples:

- Booking Confirmed
- Lesson Cancelled
- Registration Opens Tomorrow
- New Announcement
- Coach Updated Availability

Why it exists:

- Provides a centralized record for user-facing notifications
- Supports future in-app notification delivery
- Creates a foundation for later email or push notification workflows

### announcements
Fields:

- announcementId
- title
- message
- audience
- createdBy
- createdAt
- expiresAt

Why it exists:

- Stores team announcements in a centralized content collection
- Supports audience targeting for parents, coaches, admins, or all users
- Keeps time-sensitive announcements manageable with expiration support

### settings
One document storing system configuration.

Fields:

- seasonStart
- seasonEnd
- registrationOpen
- unlimitedBookingDate
- defaultLessonStart
- defaultLessonEnd
- cancellationHours
- maxSwimmersPerLesson
- bookingsEnabled

Why it exists:

- Centralizes system-wide configuration in a single document
- Keeps business rules configurable without code changes
- Simplifies season, registration, booking, and cancellation management

### auditLogs
Track administrator actions.

Fields:

- action
- performedBy
- timestamp
- affectedCollection
- affectedDocument

Why it exists:

- Provides accountability for administrative changes
- Supports troubleshooting and operational review
- Creates a history of sensitive system actions

## Relationships

- One user may be linked to one coach profile through coaches.userId
- One parent user may have many swimmers through swimmers.parentId
- One coach may have many availability records through availability.coachId
- One coach may have many bookings through bookings.coachId
- One parent may have many bookings through bookings.parentId
- One availability slot may be linked to one booking through bookings.availabilityId
- One booking may include multiple swimmers through bookings.swimmerIds
- Announcements are created by a user referenced in announcements.createdBy
- Audit logs record the administrator user through auditLogs.performedBy
- One user may have many notifications through notifications.userId

## Security Rules

- Users can only read and write data permitted by their role
- Parents can only access their own user record, their swimmers, and their bookings
- Coaches can only access their own profile, their availability, and their bookings
- Administrators can access all collections and documents
- Settings should be writable only by administrators
- Audit logs should be append-only and administrator-visible

## Indexes

- bookings by coachId, lessonDate, and startTime
- bookings by availabilityId
- bookings by parentId and createdAt
- bookings by status and lessonDate
- availability by coachId, date, and available
- announcements by audience, createdAt, and expiresAt
- swimmers by parentId and active
- coaches by active and lastName
- notifications by userId, read, createdAt, and type

## Collection Purpose Summary

- users: authentication and shared account identity
- swimmers: parent-owned swimmer profiles
- coaches: coach profile and payment data
- availability: time slots coaches make bookable
- bookings: lesson reservations and lesson history
- notifications: user-facing alerts and future messaging foundation
- announcements: internal communication to users
- settings: centralized system configuration
- auditLogs: administrator action history
