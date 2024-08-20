## Pre-Condition
- Here, we are creating MongoDB Documents as a pre-conditions to run the Project.
- Overtime, this all will be replaced by APIs or Automation, but as of now I do not have time to implement this stuff, because need to give working demo in 4 days.
- I will add Admin portal, where admin can manage this through UI.

### Create Role
```
{
    roleName: 'ROLE_ADMIN',
    description: 'Admin Role'
}
```
```
{
    roleName: 'ROLE_USER',
    description: 'User Role'
}
```

### Create Admin User
Replace Role's object id with ROLE_ADMIN object ID, There will be no API for ADMIN users, only way will be to create with query.
```
{
    name: 'Dhruv Prajapati',
    oid: '00000000-0000-0000-0000-000000000000',
    preferredUsername: 'dhruv.prajapati@abcd.com',
    role: ObjectId('66ab0d33e27786913f340a8a')
}
```

### Create Idea Stages
Replace object id with your `ADMIN` user's object ID.
```
{
  "stageName": "Idea",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
},
```
```
{
  "stageName": "Brainstorm",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
},
```
```
{
  "stageName": "Selected",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
},
```
```
{
  "stageName": "Archived",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
},
```
```
{
  "stageName": "Implemented",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```

### Create Idea Verticals
Replace object id with your `ADMIN` user's object ID.
```
{
  "verticalName": "Tools & Technology",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
},
```
```
{
  "verticalName": "Process & Documentation",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
},
```
```
{
  "verticalName": "Work Life Integrations",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
},
```
```
{
  "verticalName": Other",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
},
```

### Create Functions
Replace object id with your `ADMIN` user's object ID.
```
{
  "functionName": "PS",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```
```
{
  "functionName": "ASCE",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```
```
{
  "functionName": "PLM",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```
```
{
  "functionName": "Ops & Analytics",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```
```
{
  "functionName": "GPMO & RM",
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```

### Create Sub Division
Replace functionID with your `Relevant function's` object ID.
Replace object id with your `ADMIN` user's object ID.
#### Subdivisions of PS
```
{
  "subdivisionName": "GDC",
  "functionId": ObjectId("66ae2ca91226a2b3ef06b224"),
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```
```
{
  "subdivisionName": "APAC",
  "functionId": ObjectId("66ae2ca91226a2b3ef06b224"),
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```
```
{
  "subdivisionName": "EMEA",
  "functionId": ObjectId("66ae2ca91226a2b3ef06b224"),
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
``` 
```
{
  "subdivisionName": "AMER",
  "functionId": ObjectId("66ae2ca91226a2b3ef06b224"),
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
``` 
#### Subdivisions of ASCE
```
{
  "subdivisionName": "Automation",
  "functionId": ObjectId("66ae2cae1226a2b3ef06b225"),
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
``` 
```
{
  "subdivisionName": "Delivery",
  "functionId": ObjectId("66ae2cae1226a2b3ef06b225"),
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```
#### Subdivisions of GPMO & RM
```
{
  "subdivisionName": "PM",
  "functionId": ObjectId("66ae2cc01226a2b3ef06b228"),
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```
```
{
  "subdivisionName": "RM",
  "functionId": ObjectId("66ae2cc01226a2b3ef06b228"),
  "createdBy": ObjectId("66ae26ca1226a2b3ef06b215"),
  "updatedBy": ObjectId("66ae26ca1226a2b3ef06b215")
}
```