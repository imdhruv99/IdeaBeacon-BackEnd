## Frontend Screens

- Login
- Dashboard
- Post Idea
- List Ideas
- Idea Details
- About
- Help - contact details for query & suggestions
- Login Guidance
- HTML for Guidance [OPT]

## API List

#### Page 1: Post Idea
- Post Idea Create API 
- Idea Vertical API - Dropdown
- Function Vertical API - Dropdown
- Sub Division API -  Dropdown

#### Page 2: Ideas
- List/Filter all idea API
- Filter Dropdown list for values API 
- Excel download API
- Get Idea content by ID

#### Page 3: My Ideas
- Same API as Page 2, take user from login session

#### Page 4: About
- Fetch Context

#### Page 5: User Guide
- HTML page create on login page

#### Page 6: Dashboard
- Idea Stages API
- Idea Verticals API

#### Page 7: Login
- Login API , Microsoft AD Authentication


## Database Tables

#### User Table
| Column Names  | key| DataType
| ------------- | ------------- | ------------- | 
| User ID |  Primary key | hexadecimal | 
| Azure ID | Unique | String |
| Name | not null | String |
| Email | not null |String|

#### Idea Vertical
| Column Names  | key| DataType
| ------------- | ------------- | ------------- | 
| ID | PK | hexadecimal |
| Vertical name | not null | string|

#### Idea Stage Table
| Column Names  | key| DataType
| ------------- | ------------- | ------------- |
| ID | PK | hexadecimal |
| stage name | not null | string |

#### Function Table
| Column Names  | key| DataType
| ------------- | ------------- | ------------- | 
| Function Id | PK | hexadecimal | 
| Function name | not null | string |

#### Subdivision Table
| Column Names  | key| DataType
| ------------- | ------------- | ------------- | 
| Sub div ID | PK | hexadecimal |
|Sub div name| not null | string |
| FunctionID | FG | ID|

#### Shared Idea with author Table
| Column Names  | key| DataType
| ------------- | ------------- | ------------- |
| ID | PK | hexadecimal |
| Idea post ID | FG | ID|
| author(user table) ID | FG |  ID|
| shared users ID | FG | list|

#### Idea Table
|Column Names|Key|DataType|
| ------------- | ------------- | ------------- | 
| ID | PK | hexadecimal|
|Idea Vertical | FG | id |
|Idea stage | FG | id |
| Title| not null | string |
| problem statement| not null | string |
| advantage| not null | string |
| proposed solution| not null | string |
| Existing solution|not null | string|
|Presentable date | not null | date|
| Function| FG | id |
| sub div|  FG | id |
| isPrivate | default=false| bool|
| coauthors | null possible |list of user id|
| tags | not null | list of string|

#### Audit Log Table
|Column Names|Key|DataType|
| ------------- | ------------- | ------------- | 
| ID | PK | hexadecimal|
| Event Name | not null | string|
| details | not null | string|


#### ALL TABLES WILL HAVE CREATED BY, UPDATED BY, CREATED AT, UPDATED AT Columns