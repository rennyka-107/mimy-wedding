CREATE TABLE "verification_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(6) NOT NULL,
	"expires" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	CONSTRAINT "verification_codes_email_unique" UNIQUE("email")
);
