CREATE TYPE "public"."invitation_status" AS ENUM('draft', 'paid');--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"status" "invitation_status" DEFAULT 'draft' NOT NULL,
	"total_money" integer DEFAULT 0,
	"access_number" integer DEFAULT 0,
	"date_from" timestamp,
	"date_to" timestamp,
	"template_id" varchar(100),
	"data" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;