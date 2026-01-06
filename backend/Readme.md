# Blood Donation Backend API

This document provides details on the backend API endpoints for the Blood Donation application.

## Organization Endpoints

All endpoints under `/org` are related to organizations like hospitals, blood banks, etc.

---

### `POST /org/signup`

Registers a new organization.

**Request Body:**
```json
{
    "orgName": "JntuOrg",
    "email": "jntuorg@gmail.com",
    "password": "jntuOrg@123",
    "registrationNumber": "poissy3",
    "orgType": "Hospital"
}
```

**Response (201 Created):**
```json
{
    "msg": "Organization created successfully",
    "org": {
        "orgName": "Jntuorg",
        "email": "jntuorg@gmail.com",
        "orgType": "Hospital",
        "role": "org",
        "registrationNumber": "poissy3",
        "recievingBlood": false,
        "recievingBloodTypes": [],
        "_id": "68a8b59b872328a05d9cdb9e",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE4YjU5Yjg3MjMyOGEwNWQ5Y2RiOWUiLCJpYXQiOjE3NTU4ODcwMDN9.EoGgGT9vzDBnmauekbqPq69RW1Q6A92u0RqIq5kRhqM"
}
```

---

### `PUT /org/updateOrg`

Updates the details of a logged-in organization.
**Authentication Required.**

**Request Body:**
```json
{
    "address": "Jntu Bus Station, JNTU Road, Phase 3, Ward 114 KPHB Colony",
    "timings": "12:30PM - 01:40PM",
    "contactNumber": "9999888876",
    "recievingBloodTypes": ["A+", "AB+", "B+", "O+"],
    "recievingBlood": true
}
```

**Response (200 OK):**
```json
{
    "msg": "Organization updated successfully",
    "org": {
        "location": {
            "type": "Point",
            "address": "Jntu Bus Station, JNTU Road, Phase 3, Ward 114 KPHB Colony",
            "coordinates": [
                78.3948668,
                17.4957767
            ]
        },
        "_id": "68a8b59b872328a05d9cdb9e",
        "orgName": "Jntuorg",
        "email": "jntuorg@gmail.com",
        "orgType": "Hospital",
        "role": "org",
        "registrationNumber": "poissy3",
        "recievingBlood": true,
        "recievingBloodTypes": [
            "A+",
            "AB+",
            "B+",
            "O+"
        ],
        "__v": 0,
        "bloodStock": "68a8b59b872328a05d9cdba0",
        "donateBlood": "68a8b59b872328a05d9cdba2",
        "contactNumber": "9999888876",
        "timings": "12:30PM - 01:40PM"
    }
}
```

---

### `PUT /org/cancelRecievingBlood`

Disables blood reception for the organization.
**Authentication Required.**

**Request Body:** (None)

**Response (200 OK):**
```json
{
    "msg": "Successfully cancelled recieving blood",
    "org": { ... }
}
```

---

### `POST /org/event`

Creates a new blood donation event for the organization.
**Authentication Required.**

**Request Body:**
```json
{
  "title": "Community Blood Drive",
  "type": "Community Drives",
  "description": "A community blood donation drive to support local hospitals and save lives.",
  "date": "2025-09-10",
  "time": "10:00 AM",
  "venue": "Block 3 seminar hall",
  "address": "Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Medchal–Malkajgiri, Telangana, India",
  "goal": 200
}
```

**Response (201 Created):**
```json
{
    "msg": "Event created successfully",
    "event": {
        "organizerId": "68a8b59b872328a05d9cdb9e",
        "title": "Community Blood Drive",
        "type": "Community Drives",
        "description": "A community blood donation drive to support local hospitals and save lives.",
        "date": "2025-09-10T00:00:00.000Z",
        "time": "10:00 AM",
        "venue": "Block 3 seminar hall",
        "location": {
            "type": "Point",
            "address": "Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Medchal–Malkajgiri, Telangana, India",
            "coordinates": [
                78.36659728576964,
                17.520402699999998
            ]
        },
        "goal": 200,
        "registered": 0,
        "status": "upcoming",
        "_id": "68a8b5f1872328a05d9cdbaf",
        "created_at": "2025-08-22T18:24:49.669Z",
        "__v": 0
    }
}
```

---

### `PUT /org/event`

Updates an existing event.
**Authentication Required.**

**Request Body:**
```json
{
  "eventId": "68a8b5f1872328a05d9cdbaf",
  "title": "Updated Community Blood Drive",
  "type": "Community Drives",
  "description": "An updated description for the upcoming community blood donation drive.",
  "date": "2025-09-12",
  "time": "11:00 AM-2:30PM",
  "venue": "Computer science block",
  "address": "Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Medchal–Malkajgiri, Telangana, India",
  "goal": 250
}
```

**Response (200 OK):**
```json
{
    "msg": "Event updated successfully",
    "event": {
        "location": {
            "type": "Point",
            "address": "Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Medchal–Malkajgiri, Telangana, India",
            "coordinates": [
                78.36659728576964,
                17.520402699999998
            ]
        },
        "_id": "68a8b5f1872328a05d9cdbaf",
        "organizerId": "68a8b59b872328a05d9cdb9e",
        "title": "Updated Community Blood Drive",
        "type": "Community Drives",
        "description": "An updated description for the upcoming community blood donation drive.",
        "date": "2025-09-12T00:00:00.000Z",
        "time": "11:00 AM-2:30PM",
        "venue": "Computer science block",
        "goal": 250,
        "registered": 0,
        "status": "upcoming",
        "created_at": "2025-08-22T18:24:49.669Z",
        "__v": 0
    }
}
```

---

### `GET /org/events`

Retrieves all events created by the logged-in organization.
**Authentication Required.**

**Response (200 OK):**
```json
{
    "msg": "Events retrieved successfully",
    "events": [
        {
            "location": {
                "type": "Point",
                "address": "Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Medchal–Malkajgiri, Telangana, India",
                "coordinates": [
                    78.36659728576964,
                    17.520402699999998
                ]
            },
            "_id": "68a8b5f1872328a05d9cdbaf",
            "organizerId": {
                "_id": "68a8b59b872328a05d9cdb9e",
                "orgName": "Jntuorg",
                "email": "jntuorg@gmail.com"
            },
            "title": "Updated Community Blood Drive",
            "type": "Community Drives",
            "description": "An updated description for the upcoming community blood donation drive.",
            "date": "2025-09-12T00:00:00.000Z",
            "time": "11:00 AM-2:30PM",
            "venue": "Computer science block",
            "goal": 250,
            "registered": 0,
            "status": "upcoming"
        }
    ]
}
```

---

### `GET /org/donate-blood-forms/:eventId`

Retrieves all donation forms submitted for a specific event.
**Authentication Required.**

**URL Params:**
- `eventId`: The ID of the event.

**Response (200 OK):**
```json
{
    "msg": "Donate blood forms retrieved successfully",
    "forms": [
        {
            "_id": "68a8ad0f1eb3d46216164734",
            "user": {
                "_id": "68a6195ff980f0b906316b6e",
                "fullname": "Pankaj Singh",
                "email": "pankaj@gmail.com"
            },
            "fullname": "Pankaj",
            "bloodType": "A+",
            "lastDonationDate": null,
            "phone": "1231231231",
            "eventId": "68a6c8c607d5d0976772fec1",
            "eventModel": "Event",
            "__v": 0
        }
    ]
}
```

---

### `PUT /org/updateDonateBloodFormStatus`

Updates the status of a donation form (`pending`, `approved`, `rejected`, `completed`).
**Authentication Required.**

**Request Body:**
```json
{
    "formId": "68a8b35080fca62d1f3a0069",
    "status": "approved"
}
```

**Response (200 OK):**
```json
{
    "msg": "Donate blood form status updated successfully",
    "form": {
        "_id": "68a8b35080fca62d1f3a0069",
        "user": "68a6195ff980f0b906316b6e",
        "fullname": "Pankaj",
        "bloodType": "A+",
        "lastDonationDate": null,
        "phone": "1231231231",
        "eventId": {
            "location": {
                "type": "Point",
                "address": "Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Medchal–Malkajgiri, Telangana, India",
                "coordinates": [
                    78.36659728576964,
                    17.520402699999998
                ]
            },
            "_id": "68a6c8c607d5d0976772fec1",
            "organizerId": "68a63bac7c8e1dd84c5f0171",
            "title": "Updated Community Blood Drive",
            "type": "Community Drives",
            "description": "An updated description for the upcoming community blood donation drive.",
            "date": "2025-09-12T00:00:00.000Z",
            "time": "11:00 AM-2:30PM",
            "venue": "Computer science block",
            "goal": 250,
            "registered": 0,
            "status": "upcoming",
            "created_at": "2025-08-21T07:20:38.299Z",
            "__v": 0
        },
        "eventModel": "Event",
        "status": "approved",
        "__v": 0
    }
}
```

---

## User Endpoints

All endpoints under `/user` are related to users.

---

### `POST /user/signup`

Registers a new user.

**Request Body:**
```json
{
    "fullname": "Pankaj Singh",
    "email": "pankaj@gmail.com",
    "password": "password123"
}
```

**Response (201 Created):**
```json
{
    "msg": "User created successfully",
    "user": {
        "fullname": "Pankaj Singh",
        "email": "pankaj@gmail.com",
        "role": "user",
        "_id": "68a6195ff980f0b906316b6e",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE2MTk1ZmY5ODBmMGI5MDYzMTZiNmUiLCJpYXQiOjE3NTU4ODcwMDN9.somejwttoken"
}
```

---

### `POST /user/signin`

Logs in an existing user.

**Request Body:**
```json
{
    "email": "pankaj@gmail.com",
    "password": "password123"
}
```

**Response (200 OK):**
```json
{
    "msg": "User logged in successfully",
    "user": {
        "_id": "68a6195ff980f0b906316b6e",
        "fullname": "Pankaj Singh",
        "email": "pankaj@gmail.com",
        "role": "user",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE2MTk1ZmY5ODBmMGI5MDYzMTZiNmUiLCJpYXQiOjE3NTU4ODcwMDN9.somejwttoken"
}
```

---

### `GET /user/me`

Retrieves the profile of the logged-in user.
**Authentication Required.**

**Response (200 OK):**
```json
{
    "msg": "User profile",
    "user": {
        "_id": "68a6195ff980f0b906316b6e",
        "fullname": "Pankaj Singh",
        "email": "pankaj@gmail.com",
        "role": "user"
    }
}
```

---

### `PUT /user/updateProfile`

Updates the profile of the logged-in user.
**Authentication Required.**

**Request Body:**
```json
{
    "fullname": "Pankaj Kumar Singh"
}
```

**Response (200 OK):**
```json
{
    "msg": "User updated successfully",
    "updatedFields": {
        "_id": "68a6195ff980f0b906316b6e",
        "fullname": "Pankaj Kumar Singh",
        "email": "pankaj@gmail.com",
        "role": "user",
        "__v": 0
    }
}
```

---

### `PUT /user/updatePassword`

Updates the password of the logged-in user.
**Authentication Required.**

**Request Body:**
```json
{
    "password": "password123",
    "newPassword": "newpassword123"
}
```

**Response (200 OK):**
```json
{
    "message": "Password successfully updated"
}
```

---

### `DELETE /user/deleteProfile`

Deletes the profile of the logged-in user.
**Authentication Required.**

**Response (200 OK):**
```json
{
    "msg": "User deleted successfully",
    "user": {
        "_id": "68a6195ff980f0b906316b6e",
        "fullname": "Pankaj Kumar Singh",
        "email": "pankaj@gmail.com",
        "role": "user",
        "__v": 0
    }
}
```

---

### `POST /user/logout`

Logs out the current user by blacklisting the token.
**Authentication Required.**

**Response (200 OK):**
```json
{
    "msg": "User logged out successfully"
}
```

---

### `POST /user/story`

Creates a new story for the logged-in user.
**Authentication Required.**

**Request Body:**
```json
{
    "tag": "First Time Donor",
    "story": "This was my first time donating blood and it was a great experience. I'm happy I could help someone."
}
```

**Response (201 Created):**
```json
{
    "msg": "Story created successfully",
    "story": {
        "user": "68a6195ff980f0b906316b6e",
        "tag": "First Time Donor",
        "story": "This was my first time donating blood and it was a great experience. I'm happy I could help someone.",
        "_id": "68a8c0f1872328a05d9cdbaf",
        "createdAt": "2025-08-22T18:24:49.669Z",
        "updatedAt": "2025-08-22T18:24:49.669Z",
        "__v": 0
    }
}
```

---

### `GET /user/yourstory`

Retrieves the story of the logged-in user.
**Authentication Required.**

**Response (200 OK):**
```json
{
    "msg": "Story fetched successfully",
    "story": {
        "_id": "68a8c0f1872328a05d9cdbaf",
        "user": {
            "_id": "68a6195ff980f0b906316b6e",
            "fullname": "Pankaj Singh",
            "email": "pankaj@gmail.com"
        },
        "tag": "First Time Donor",
        "story": "This was my first time donating blood and it was a great experience. I'm happy I could help someone.",
        "createdAt": "2025-08-22T18:24:49.669Z",
        "updatedAt": "2025-08-22T18:24:49.669Z",
        "__v": 0
    }
}
```

---

### `GET /user/stories`

Retrieves all stories.
**Authentication Required.**

**Response (200 OK):**
```json
{
    "msg": "Stories fetched successfully",
    "stories": [
        {
            "_id": "68a8c0f1872328a05d9cdbaf",
            "user": {
                "_id": "68a6195ff980f0b906316b6e",
                "fullname": "Pankaj Singh",
                "email": "pankaj@gmail.com"
            },
            "tag": "First Time Donor",
            "story": "This was my first time donating blood and it was a great experience. I'm happy I could help someone.",
            "createdAt": "2025-08-22T18:24:49.669Z",
            "updatedAt": "2025-08-22T18:24:49.669Z",
            "__v": 0
        }
    ]
}
```

---

### `PUT /user/story/:storyId`

Updates an existing story for the logged-in user.
**Authentication Required.**

**URL Params:**
- `storyId`: The ID of the story to update.

**Request Body:**
```json
{
    "tag": "Regular Donor",
    "story": "Updated story: I donate blood regularly and it's a fulfilling experience."
}
```

**Response (200 OK):**
```json
{
    "msg": "Story updated successfully",
    "story": {
        "_id": "68a8c0f1872328a05d9cdbaf",
        "user": "68a6195ff980f0b906316b6e",
        "tag": "Regular Donor",
        "story": "Updated story: I donate blood regularly and it's a fulfilling experience.",
        "createdAt": "2025-08-22T18:24:49.669Z",
        "updatedAt": "2025-08-22T19:30:00.000Z",
        "__v": 0
    }
}
```

---

### `DELETE /user/story/:storyId`

Deletes a story for the logged-in user.
**Authentication Required.**

**URL Params:**
- `storyId`: The ID of the story to delete.

**Response (200 OK):**
```json
{
    "msg": "Story deleted successfully"
}
```

---

### `POST /user/donate-blood-form/:eventId`

Submits a form to donate blood for a specific event.
**Authentication Required.**

**URL Params:**
- `eventId`: The ID of the event.

**Request Body:**
```json
{
    "fullname": "Pankaj",
    "bloodType": "A+",
    "phone": "1231231231",
    "lastDonationDate": "2024-01-15",
    "eventModel": "Event"
}
```
*Note: `lastDonationDate` is optional.*

**Response (200 OK):**
```json
{
    "message": "Form Successfully Submitted",
    "donateForm": {
        "user": "68a6195ff980f0b906316b6e",
        "fullname": "Pankaj",
        "bloodType": "A+",
        "phone": "1231231231",
        "lastDonationDate": "2024-01-15T00:00:00.000Z",
        "eventId": "68a6c8c607d5d0976772fec1",
        "eventModel": "Event",
        "status": "pending",
        "_id": "68a8ad0f1eb3d46216164734",
        "__v": 0
    }
}
```

---

### `GET /user/donate-blood-forms`

Retrieves all donation forms submitted by the logged-in user.
**Authentication Required.**

**Response (200 OK):**
```json
{
    "message": "Donate blood forms retrieved successfully",
    "donateBloodForms": [
        {
            "_id": "68a8ad0f1eb3d46216164734",
            "user": {
                "_id": "68a6195ff980f0b906316b6e",
                "fullname": "Pankaj Singh",
                "email": "pankaj@gmail.com",
                "phone": "1231231231"
            },
            "eventId": {
                "_id": "68a6c8c607d5d0976772fec1",
                "name": "Community Blood Drive",
                "date": "2025-09-10T00:00:00.000Z",
                "location": {
                    "type": "Point",
                    "address": "Gokaraju Rangaraju Institute of Engineering and Technology...",
                    "coordinates": [78.366, 17.520]
                }
            },
            "fullname": "Pankaj",
            "bloodType": "A+",
            "lastDonationDate": "2024-01-15T00:00:00.000Z",
            "phone": "1231231231",
            "status": "pending",
            "eventModel": "Event",
            "__v": 0
        }
    ]
}
```

---

### `GET /user/donate-blood-form/:eventId`

Retrieves the donation form submitted by the logged-in user for a specific event.
**Authentication Required.**

**URL Params:**
- `eventId`: The ID of the event.

**Response (200 OK):**
```json
{
    "message": "Donate blood forms for the event retrieved successfully",
    "event": { ...event details... },
    "donateBloodForm": [
        {
            "_id": "68a8ad0f1eb3d46216164734",
            "user": {
                "_id": "68a6195ff980f0b906316b6e",
                "fullname": "Pankaj Singh",
                "email": "pankaj@gmail.com",
                "phone": "1231231231"
            },
            "fullname": "Pankaj",
            "bloodType": "A+",
            "lastDonationDate": "2024-01-15T00:00:00.000Z",
            "phone": "1231231231",
            "status": "pending",
            "eventModel": "Event",
            "__v": 0
        }
    ]
}
```

---

### `DELETE /user/donate-blood-form`

Deletes a donation form submitted by the logged-in user.
**Authentication Required.**

**Request Body:**
```json
{
    "formId": "68a8ad0f1eb3d46216164734"
}
```

**Response (200 OK):**
```json
{
    "message": "Donation Blood form deleted successfully"
}
```

---

## Location Endpoints

All endpoints under `/location` are related to location services.

---

### `GET /location/autoComplete`

Provides autocomplete suggestions for a location based on user input.

**Query Parameters:**
- `input` (string, required): The partial address or place name to get suggestions for. Example: `Jntu metro station hyd`

**Response (200 OK):**
```json
[
    {
        "place_id": "321070962423",
        "osm_id": "11736385868",
        "osm_type": "node",
        "licence": "https://locationiq.com/attribution",
        "lat": "17.4957767",
        "lon": "78.3948668",
        "boundingbox": [
            "17.4957267",
            "17.4958267",
            "78.3948168",
            "78.3949168"
        ],
        "class": "amenity",
        "type": "bus_station",
        "display_name": "Jntu Bus Station, JNTU Road, Phase 3, Ward 114 KPHB Colony, Hyderabad, Kukatpally mandal, Telangana, 500085, India",
        "display_place": "Jntu Bus Station",
        "display_address": "JNTU Road, Phase 3, Ward 114 KPHB Colony, Hyderabad, Kukatpally mandal, Telangana, 500085, India",
        "address": {
            "name": "Jntu Bus Station",
            "road": "JNTU Road",
            "neighbourhood": "Phase 3",
            "suburb": "Ward 114 KPHB Colony",
            "city": "Hyderabad",
            "county": "Kukatpally mandal",
            "state": "Telangana",
            "postcode": "500085",
            "country": "India",
            "country_code": "in"
        }
    },
    {
        "place_id": "321107593360",
        "osm_id": "11736392870",
        "osm_type": "node",
        "licence": "https://locationiq.com/attribution",
        "lat": "17.4944846",
        "lon": "78.3922173",
        "boundingbox": [
            "17.4944346",
            "17.4945346",
            "78.3921673",
            "78.3922673"
        ],
        "class": "amenity",
        "type": "fixme",
        "display_name": "JNTU Stationary, WAY TO CRC, Vasanth Nagar, Ward 114 KPHB Colony, Hyderabad, Kukatpally mandal, Telangana, 500085, India",
        "display_place": "JNTU Stationary",
        "display_address": "WAY TO CRC, Vasanth Nagar, Ward 114 KPHB Colony, Hyderabad, Kukatpally mandal, Telangana, 500085, India",
        "address": {
            "name": "JNTU Stationary",
            "road": "WAY TO CRC",
            "neighbourhood": "Vasanth Nagar",
            "suburb": "Ward 114 KPHB Colony",
            "city": "Hyderabad",
            "county": "Kukatpally mandal",
            "state": "Telangana",
            "postcode": "500085",
            "country": "India",
            "country_code": "in"
        }
    },
    {
        "place_id": "322395618137",
        "osm_id": "357324707",
        "osm_type": "way",
        "licence": "https://locationiq.com/attribution",
        "lat": "17.37916335",
        "lon": "78.50078418",
        "boundingbox": [
            "17.3790178",
            "17.3792892",
            "78.5005956",
            "78.5008956"
        ],
        "class": "shop",
        "type": "stationery",
        "display_name": "Metro stationery store, Race Course Road, Jamal Colony, Ward 26 Old Malakpet, Hyderabad, Amberpet mandal, Telangana, 500036, India",
        "display_place": "Metro stationery store",
        "display_address": "Race Course Road, Jamal Colony, Ward 26 Old Malakpet, Hyderabad, Amberpet mandal, Telangana, 500036, India",
        "address": {
            "name": "Metro stationery store",
            "road": "Race Course Road",
            "neighbourhood": "Jamal Colony",
            "suburb": "Ward 26 Old Malakpet",
            "city": "Hyderabad",
            "county": "Amberpet mandal",
            "state": "Telangana",
            "postcode": "500036",
            "country": "India",
            "country_code": "in"
        }
    },
    {
        "place_id": "322880063495",
        "osm_id": "5072158991",
        "osm_type": "node",
        "licence": "https://locationiq.com/attribution",
        "lat": "38.9653489",
        "lon": "-76.9537333",
        "boundingbox": [
            "38.9652989",
            "38.9653989",
            "-76.9537833",
            "-76.9536833"
        ],
        "class": "highway",
        "type": "bus_stop",
        "display_name": "Hyattsville Crossing Metro Station, Belcrest Road, Hyattsville Hills, Hyattsville, Prince George's County, Maryland, 20782, USA",
        "display_place": "Hyattsville Crossing Metro Station",
        "display_address": "Belcrest Road, Hyattsville Hills, Hyattsville, Prince George's County, Maryland, 20782, USA",
        "address": {
            "name": "Hyattsville Crossing Metro Station",
            "road": "Belcrest Road",
            "neighbourhood": "Hyattsville Hills",
            "city": "Hyattsville",
            "county": "Prince George's County",
            "state": "Maryland",
            "postcode": "20782",
            "country": "United States of America",
            "country_code": "us"
        }
    },
    {
        "place_id": "321865911980",
        "osm_id": "1163289546",
        "osm_type": "way",
        "licence": "https://locationiq.com/attribution",
        "lat": "17.39005435",
        "lon": "78.55924478",
        "boundingbox": [
            "17.3898818",
            "17.3902269",
            "78.5590503",
            "78.5594393"
        ],
        "class": "amenity",
        "type": "bus_station",
        "display_name": "Metro Bus Station  Uppal, Metro Service Road, Saraswati Colony, Ward 10 Uppal, Hyderabad, Uppal mandal, Telangana, 500039, India",
        "display_place": "Metro Bus Station  Uppal",
        "display_address": "Metro Service Road, Saraswati Colony, Ward 10 Uppal, Hyderabad, Uppal mandal, Telangana, 500039, India",
        "address": {
            "name": "Metro Bus Station  Uppal",
            "road": "Metro Service Road",
            "neighbourhood": "Saraswati Colony",
            "suburb": "Ward 10 Uppal",
            "city": "Hyderabad",
            "county": "Uppal mandal",
            "state": "Telangana",
            "postcode": "500039",
            "country": "India",
            "country_code": "in"
        }
    }
]
```

---

## Blood Service Endpoints

All endpoints under `/bloodServices` are related to blood services like finding events.
**Authentication Required for all routes.**

---

### `GET /bloodServices/events`

Retrieves a list of blood donation events. Can be filtered by range, type, and date range.

**Request Body (Optional):**
Used for filtering events.
```json
{
    "range": {
        "coordinates": {
            "lng": 78.4867,
            "lat": 17.3850
        },
        "radius": 10 
    },
    "type": "Community Drives",
    "daysRange": 30
}
```
* `range`: object containing `coordinates` (lng, lat) and `radius` in kilometers.
* `type`: string, one of `['Community Drives','Corporate Events','School Drives']`.
* `daysRange`: number of days from today to look for events.

**Response (200 OK):**
```json
{
    "msg": "Events fetched successfully",
    "events": [
        {
            "location": {
                "type": "Point",
                "address": "Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Medchal–Malkajgiri, Telangana, India",
                "coordinates": [
                    78.36659728576964,
                    17.520402699999998
                ]
            },
            "_id": "68a6c8c607d5d0976772fec1",
            "organizerId": "68a63bac7c8e1dd84c5f0171",
            "title": "Community Blood Drive",
            "type": "Community Drives",
            "description": "Join us for our annual community blood drive and help save lives.",
            "date": "2025-09-12T00:00:00.000Z",
            "time": "10:00 AM - 4:00 PM",
            "venue": "Main Auditorium",
            "goal": 150,
            "registered": 25,
            "status": "upcoming",
            "created_at": "2025-08-21T07:20:38.299Z",
            "__v": 0
        }
    ]
}
```

---

### `GET /bloodServices/events/:eventId`

Retrieves details for a specific blood donation event.

**URL Params:**
- `eventId`: The ID of the event.

**Response (200 OK):**
```json
{
    "msg": "Event fetched successfully",
    "event": {
        "location": {
            "type": "Point",
            "address": "Gokaraju Rangaraju Institute of Engineering and Technology, Bachupally, Medchal–Malkajgiri, Telangana, India",
            "coordinates": [
                78.36659728576964,
                17.520402699999998
            ]
        },
        "_id": "68a6c8c607d5d0976772fec1",
        "organizerId": "68a63bac7c8e1dd84c5f0171",
        "title": "Community Blood Drive",
        "type": "Community Drives",
        "description": "Join us for our annual community blood drive and help save lives.",
        "date": "2025-09-12T00:00:00.000Z",
        "time": "10:00 AM - 4:00 PM",
        "venue": "Main Auditorium",
        "goal": 150,
        "registered": 25,
        "status": "upcoming",
        "created_at": "2025-08-21T07:20:38.299Z",
        "__v": 0
    }
}
```
