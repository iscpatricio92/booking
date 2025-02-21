create table "public"."helloworld" (
    "id" integer not null,
    "text" character varying
);


CREATE UNIQUE INDEX helloworld_pk ON public.helloworld USING btree (id);

alter table "public"."helloworld" add constraint "helloworld_pk" PRIMARY KEY using index "helloworld_pk";

grant delete on table "public"."helloworld" to "anon";

grant insert on table "public"."helloworld" to "anon";

grant references on table "public"."helloworld" to "anon";

grant select on table "public"."helloworld" to "anon";

grant trigger on table "public"."helloworld" to "anon";

grant truncate on table "public"."helloworld" to "anon";

grant update on table "public"."helloworld" to "anon";

grant delete on table "public"."helloworld" to "authenticated";

grant insert on table "public"."helloworld" to "authenticated";

grant references on table "public"."helloworld" to "authenticated";

grant select on table "public"."helloworld" to "authenticated";

grant trigger on table "public"."helloworld" to "authenticated";

grant truncate on table "public"."helloworld" to "authenticated";

grant update on table "public"."helloworld" to "authenticated";

grant delete on table "public"."helloworld" to "service_role";

grant insert on table "public"."helloworld" to "service_role";

grant references on table "public"."helloworld" to "service_role";

grant select on table "public"."helloworld" to "service_role";

grant trigger on table "public"."helloworld" to "service_role";

grant truncate on table "public"."helloworld" to "service_role";

grant update on table "public"."helloworld" to "service_role";


