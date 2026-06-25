-- Admin access schema for HNstore.
-- Run after the base marketplace schema and auth_role_schema.sql.
--
-- Before running, replace this email with the Auth user you want to promote:
--   admin@example.com
--
-- Recommended flow:
-- 1. Create/register a normal account with this email.
-- 2. Run this file in Supabase SQL Editor.
-- 3. Login with role "Admin" in the app.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users u
    where u.id = auth.uid()
      and u.role = 'admin'
  );
$$;

-- Promote an existing Supabase Auth user to admin.
-- Change the email value before running.
insert into public.users (id, name, email, role)
select
  au.id,
  coalesce(nullif(au.raw_user_meta_data->>'name', ''), au.email),
  au.email,
  'admin'
from auth.users au
where au.email = 'admin@example.com'
on conflict (id) do update
set
  name = excluded.name,
  email = excluded.email,
  role = 'admin',
  updated_at = now();

-- Users
drop policy if exists "Admins can view all users" on public.users;
create policy "Admins can view all users"
on public.users
for select
using (public.is_admin());

drop policy if exists "Admins can update all users" on public.users;
create policy "Admins can update all users"
on public.users
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete users" on public.users;
create policy "Admins can delete users"
on public.users
for delete
using (public.is_admin());

-- Addresses
drop policy if exists "Admins can view all addresses" on public.addresses;
create policy "Admins can view all addresses"
on public.addresses
for select
using (public.is_admin());

-- Products
drop policy if exists "Admins can view all products" on public.products;
create policy "Admins can view all products"
on public.products
for select
using (public.is_admin());

drop policy if exists "Admins can update all products" on public.products;
create policy "Admins can update all products"
on public.products
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
on public.products
for delete
using (public.is_admin());

-- Product child tables
drop policy if exists "Admins can view all product images" on public.product_images;
create policy "Admins can view all product images"
on public.product_images
for select
using (public.is_admin());

drop policy if exists "Admins can view all product variants" on public.product_variants;
create policy "Admins can view all product variants"
on public.product_variants
for select
using (public.is_admin());

-- Orders
drop policy if exists "Admins can view all orders" on public.orders;
create policy "Admins can view all orders"
on public.orders
for select
using (public.is_admin());

drop policy if exists "Admins can update all orders" on public.orders;
create policy "Admins can update all orders"
on public.orders
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can view all order items" on public.order_items;
create policy "Admins can view all order items"
on public.order_items
for select
using (public.is_admin());

-- Payments
drop policy if exists "Admins can view all payments" on public.payments;
create policy "Admins can view all payments"
on public.payments
for select
using (public.is_admin());

drop policy if exists "Admins can update all payments" on public.payments;
create policy "Admins can update all payments"
on public.payments
for update
using (public.is_admin())
with check (public.is_admin());

-- Reviews, used by seller reports.
drop policy if exists "Admins can view all reviews" on public.reviews;
create policy "Admins can view all reviews"
on public.reviews
for select
using (public.is_admin());
