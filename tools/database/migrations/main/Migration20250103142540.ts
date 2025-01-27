import { Migration } from '@mikro-orm/migrations';

export class Migration20250103142540 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "app";`);
    this.addSql(`create table "app"."user" ("id" varchar(255) not null, "created_at" varchar(255) null, "modified_at" varchar(255) null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "active" boolean not null default true, "verification_code" varchar(255) null, "is_verified" boolean not null default false, "reset_password_code" int null, "reset_password_expiration" timestamptz null, "mint_address" varchar(255) null, "public_key" varchar(255) null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "app"."user" add constraint "user_email_unique" unique ("email");`);
    this.addSql(`alter table "app"."user" add constraint "user_mint_address_unique" unique ("mint_address");`);
    this.addSql(`alter table "app"."user" add constraint "user_public_key_unique" unique ("public_key");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "app"."user" cascade;`);

    this.addSql(`drop schema if exists "app";`);
  }

}
