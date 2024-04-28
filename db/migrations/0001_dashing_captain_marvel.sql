CREATE TABLE IF NOT EXISTS "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(250) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
