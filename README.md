# Turborepo Remix Monorepo

## 1) Cách chạy

Yêu cầu: Node >= 18, pnpm (đã dùng corepack).

```bash
cd /Users/ngoclamsn98/Desktop/project/turborepo-remix
corepack enable && corepack prepare pnpm@9.12.0 --activate
pnpm install

# Dev tất cả apps (API + Blog)
pnpm dev

# Build tất cả
pnpm build

# Lint / Type check / Test
pnpm lint
pnpm check-types
pnpm test

# E2E (Playwright)
pnpm e2e
```

Truy cập:

- Blog (Remix + Vite): http://localhost:5173
- API (Express): http://localhost:5001/status

## 2) Công nghệ

- Monorepo: Turborepo, pnpm Workspaces
- Frontend: Remix + Vite, React 18, Tailwind CSS
- UI nội bộ: `@repo/ui` (đã có `DataTable`, `Link`, `CounterButton`), build bằng Bunchee
- Server: Express (apps/api)
- Test:
  - Unit (ui): Jest + jsdom
  - Unit (blog): Vitest + jsdom + Testing Library
  - E2E: Playwright
- Chất lượng mã: TypeScript, ESLint, Prettier

## 3) Các tính năng

- Blog Remix demo với bố cục tab động bằng `flexlayout-react`:
  - Thêm tab mới bằng nút “+”
  - Đổi tên tab bằng double-click (inline editing)
- Bảng hiện đại dùng Tailwind trong `@repo/ui/table`:
  - `DataTable` tối giản: chỉ cần `columns` và `data`remote: {"auth_status":"access_denied_to_user","body":"Permission to nglwl/turborepo-remix.git denied to canxicacbonat."}
  - Styling mặc định: header `bg-gray-50`, hover row, padding, border, responsive container
  - Hiển thị trạng thái rỗng (`emptyText`)
- Ví dụ tích hợp `DataTable` trong Blog (`TablePanel`) với dữ liệu ngẫu nhiên sinh khi mount (mỗi tab mới là dataset khác)
- API Express mẫu: `/status`, `/message/:name`

## Ghi chú phát triển

- Trong môi trường test (Vitest của blog), Remix plugin được tắt để tránh lỗi preamble; test component blog mock `@repo/ui/table` khi cần.
- Chạy riêng test:
  - UI: `pnpm --filter @repo/ui test`
  - Blog: `pnpm --filter blog test`
