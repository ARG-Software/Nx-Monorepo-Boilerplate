import { Migration } from '@mikro-orm/migrations';

export class Migration20250103142838 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "action-log";`);
    this.addSql(`create table "action-log"."action_log" ("id" varchar(255) not null, "created_at" varchar(255) null, "modified_at" varchar(255) null, "user_id" varchar(255) not null, "action" varchar(255) not null, constraint "action_log_pkey" primary key ("id"));`);

    this.addSql(`drop table if exists "app"."main_migrations" cascade;`);

    this.addSql(`drop table if exists "app"."user" cascade;`);

    this.addSql(`drop schema if exists "app";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create schema if not exists "app";`);
    this.addSql(`create table "app"."main_migrations" ("id" serial primary key, "name" varchar(255) null, "executed_at" timestamptz(6) null default CURRENT_TIMESTAMP);`);

    this.addSql(`create table "app"."user" ("id" varchar(255) not null, "created_at" varchar(255) null, "modified_at" varchar(255) null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "active" bool not null default true, "verification_code" varchar(255) null, "is_verified" bool not null default false, "reset_password_code" int4 null, "reset_password_expiration" timestamptz(6) null, "mint_address" varchar(255) null, "public_key" varchar(255) null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "app"."user" add constraint "user_email_unique" unique ("email");`);
    this.addSql(`alter table "app"."user" add constraint "user_mint_address_unique" unique ("mint_address");`);
    this.addSql(`alter table "app"."user" add constraint "user_public_key_unique" unique ("public_key");`);

    this.addSql(`drop table if exists "action-log"."action_log" cascade;`);

    this.addSql(`drop schema if exists "action-log";`);
  }

}
