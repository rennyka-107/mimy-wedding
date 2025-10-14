CREATE TABLE "page_visits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ip" varchar(45) NOT NULL,
	"visit_time" timestamp DEFAULT now() NOT NULL,
	"region" varchar(255),
	"sub_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wishes" ALTER COLUMN "order_id" DROP NOT NULL;