CREATE TABLE "users" (
	id uuid NOT NULL PRIMARY KEY,
	username varchar(255) UNIQUE,
	password varchar(100),
	"type" varchar(50),
	createdAt date NULL,
	updatedAt date NULL
);
