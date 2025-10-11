CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(255) NOT NULL,
	"total_money" bigint NOT NULL,
	"template_id" varchar(100) NOT NULL,
	"template_price" bigint NOT NULL,
	"user_id" uuid NOT NULL,
	"payment_id" uuid,
	"public_url" varchar(500),
	"public_start" timestamp,
	"public_end" timestamp,
	"template_name" varchar(255) NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"template_config" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orders_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gateway" varchar(100) NOT NULL,
	"transaction_date" timestamp NOT NULL,
	"code" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"transfer_amount" bigint NOT NULL,
	"transfer_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wishes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"sender" varchar(255) NOT NULL,
	"arrive" boolean DEFAULT false NOT NULL,
	"order_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishes" ADD CONSTRAINT "wishes_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;