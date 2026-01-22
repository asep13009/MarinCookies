# TODO: Implement Image Upload to Supabase Bucket 'product_image'

## Steps to Complete:
- [x] Create new API route `src/app/api/upload-image/route.ts` to handle image uploads to Supabase bucket 'product_image' and return the public URL.
- [x] Update `src/app/admin/page.tsx` to replace "Image URL" input with file input for image selection. Modify `handleSubmit` to upload selected image and include URL in product data.
- [x] Update `src/app/api/products/route.ts` to handle image deletion in DELETE method (delete image from storage after deleting product).
- [ ] Test create, update, and delete functionality with image uploads.
