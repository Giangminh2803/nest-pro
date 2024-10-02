export const ADMIN_ROLE = "SUPER ADMIN";
export const USER_ROLE = "NORMAL USER";
export const INIT_PERMISSION = [
    {
			
		"name": "Create a User",
		"apiPath": "/api/v1/users/register",
		"method": "POST",
		"module": "User",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Create a User
	{
			
		"name": "Get user by Id",
		"apiPath": "/api/v1/users/:id",
		"method": "GET",
		"module": "User",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Get user by Id
	{
			
		"name": "Update a User",
		"apiPath": "/api/v1/users",
		"method": "PATCH",
		"module": "User",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Update a User
	{
			
		"name": "Soft-delete User by id",
		"apiPath": "/api/v1/users/:id",
		"method": "DELETE",
		"module": "User",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Soft-delete User by id
	{
			
		"name": "Fetch User with paginate",
		"apiPath": "/api/v1/users",
		"method": "GET",
		"module": "User",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Fetch User with paginate
	{
			
		"name": "Create a Room",
		"apiPath": "/api/v1/rooms",
		"method": "POST",
		"module": "Room",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Create a Room
	{
			
		"name": "Update a Room",
		"apiPath": "/api/v1/rooms/:id",
		"method": "PATCH",
		"module": "Room",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Update a Room
	{
			
		"name": "Soft-delete a Room",
		"apiPath": "/api/v1/rooms/:id",
		"method": "DELETE",
		"module": "Room",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Soft-delete a Room
	{
			
		"name": "Fetch data Room by Id",
		"apiPath": "/api/v1/rooms/:id",
		"method": "GET",
		"module": "Room",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Fetch data Room by Id
	{
			
		"name": "Fetch data Room by tenantId (userId)",
		"apiPath": "/api/v1/rooms/by-tenant/:id",
		"method": "GET",
		"module": "Room",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Fetch data Room by tenantId (userId)
	{
			
		"name": "New Request",
		"apiPath": "/api/v1/rooms",
		"method": "GET",
		"module": "Room",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //New Request
	
	{
			
		"name": "Create a Service",
		"apiPath": "/api/v1/services",
		"method": "POST",
		"module": "Service",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Create a Service
	{
			
		"name": "Update a Service",
		"apiPath": "/api/v1/services/:id",
		"method": "PATCH",
		"module": "Service",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Update a Service
	{
			
		"name": "Soft-delete a Service",
		"apiPath": "/api/v1/services/:id",
		"method": "DELETE",
		"module": "Service",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Soft-delete a Service
	{
			
		"name": "Fetch Service by Id",
		"apiPath": "/api/v1/services/:id",
		"method": "GET",
		"module": "Service",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Fetch Service by Id
	{
			
		"name": "Fetch data Services with paginate",
		"apiPath": "/api/v1/services",
		"method": "GET",
		"module": "Service",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Fetch data Services with paginate
	
	{
			
		"name": "Create a Equipment!",
		"apiPath": "/api/v1/equipments",
		"method": "POST",
		"module": "Equipment",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Create a Equipment!
	{
			
		"name": "Update a Equipment",
		"apiPath": "/api/v1/equipments/:id",
		"method": "PATCH",
		"module": "Equipment",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Update a Equipment
	{
			
		"name": "Soft-delete a Equiment",
		"apiPath": "/api/v1/equipments/:id",
		"method": "DELETE",
		"module": "Equipment",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Soft-delete a Equiment
	{
			
		"name": "Fetch data Equipment with paginate",
		"apiPath": "/api/v1/equipments",
		"method": "GET",
		"module": "Equipment",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Soft-delete a Equiment
	
	{
			
		"name": "Create a Bill",
		"apiPath": "/api/v1/bills",
		"method": "POST",
		"module": "Bill",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Create a Bill
	{
			
		"name": "Fetch data bills with paginate",
		"apiPath": "/api/v1/bills",
		"method": "GET",
		"module": "Bill",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Fetch data bills with paginate
	{
			
		"name": "Get Bills by user Id",
		"apiPath": "/api/v1/bills/by-user",
		"method": "GET",
		"module": "Bill",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Get Bills by user Id
	{
			
		"name": "Soft-delete Bill",
		"apiPath": "/api/v1/bills/:id",
		"method": "DELETE",
		"module": "Bill",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Soft-delete Bill
	{
			
		"name": "Update a Bill",
		"apiPath": "/api/v1/bills/:id",
		"method": "PATCH",
		"module": "Bill",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Update a Bill
	
	{
			
		"name": "Create a Contract",
		"apiPath": "/api/v1/contracts",
		"method": "POST",
		"module": "Contract",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Create a Contract
	{
			
		"name": "Update a Contract",
		"apiPath": "/api/v1/contracts/:id",
		"method": "PATCH",
		"module": "Contract",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Update a Contract
	{
			
		"name": "Soft-delete a Contract",
		"apiPath": "/api/v1/contracts/:id",
		"method": "DELETE",
		"module": "Contract",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Soft-delete a Contract
	{
			
		"name": "Fetch data Contracts with paginate",
		"apiPath": "/api/v1/contracts",
		"method": "GET",
		"module": "Contract",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Fetch data Contracts with paginate
	{
			
		"name": "Fetch data Contracts for User with paginate",
		"apiPath": "/api/v1/contracts/for-user",
		"method": "GET",
		"module": "Contract",
		"createdBy":{
			"_id": "",
			"email": "admin@gmail.com"
		},
		"isDeleted": false,
		"deletedAt": null,
		"createdAt": "2024-08-17T04:41:40.369Z",
		"updatedAt": "",
		"__v": 0,
		"updatedBy": {}
	
	}, //Fetch data Contracts for User with paginate
]