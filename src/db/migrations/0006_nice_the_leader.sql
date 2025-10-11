ALTER TABLE "users" ADD COLUMN "image_used" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "draft_used" integer DEFAULT 0 NOT NULL;