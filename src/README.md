# GoLearn - React App Architecture

## Cấu trúc thư mục

```
src/
├── app/                    # App-level configuration
│   └── pages/             # Page components
├── features/              # Feature-based modules
│   ├── onboarding/        # Onboarding flow
│   ├── learning/          # Learning features
│   └── auth/              # Authentication (future)
├── shared/                # Shared components and utilities
│   ├── components/        # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layouts/          # Layout components
│   └── providers/        # Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and data
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── assets/               # Static assets
├── App.tsx               # Main app component
└── main.tsx              # App entry point
```

## Quy tắc đặt tên và tổ chức

### Features
- Mỗi feature có thư mục riêng
- Mỗi feature có file `index.ts` để export
- Components liên quan đến feature được đặt trong thư mục feature đó

### Shared
- `shared/ui/`: Các component UI từ shadcn/ui
- `shared/components/`: Các component tái sử dụng
- `shared/providers/`: Context providers
- `shared/layouts/`: Layout components

### Path Aliases
- `@/`: `src/`
- `@/features/*`: `src/features/*`
- `@/shared/*`: `src/shared/*`
- `@/ui/*`: `src/shared/ui/*`
- `@/components/*`: `src/shared/components/*`
- `@/hooks/*`: `src/hooks/*`
- `@/lib/*`: `src/lib/*`
- `@/types/*`: `src/types/*`
- `@/utils/*`: `src/utils/*`
- `@/assets/*`: `src/assets/*`

## Best Practices

1. **Feature-based organization**: Nhóm các components theo tính năng
2. **Shared components**: Đặt các component tái sử dụng trong `shared/`
3. **Path aliases**: Sử dụng aliases để import dễ dàng hơn
4. **Index files**: Mỗi thư mục có file `index.ts` để export
5. **Type safety**: Sử dụng TypeScript cho type safety
