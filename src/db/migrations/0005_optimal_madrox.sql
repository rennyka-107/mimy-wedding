ALTER TABLE "users" ADD COLUMN "image_limit" integer DEFAULT 10 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "draft_limit" integer DEFAULT 1 NOT NULL;