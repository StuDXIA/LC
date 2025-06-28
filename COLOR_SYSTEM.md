# Luminous Core カラーシステム改善案

## Ultra-Professional Blue Color Palette

### Primary Colors (3色に絞る)
```css
--color-primary: #0066CC;      /* IBM Blue - 信頼と安定 */
--color-primary-dark: #003D7A; /* Deep Professional Blue */
--color-neutral: #F8FAFC;      /* Almost White - 清潔感 */
```

### Supporting Colors (最小限に)
```css
--color-text-primary: #1A202C;   /* Almost Black */
--color-text-secondary: #4A5568; /* Muted Gray */
--color-border: #E2E8F0;         /* Light Gray */
--color-success: #059669;        /* Green - 成果表現のみ */
```

## Design Principles

### 1. **色の使用を制限**
- メインカラーは青系2色のみ
- グラデーションは単色の明暗で表現
- アニメーションでの色変化を最小限に

### 2. **プロフェッショナルな表現**
- 派手なグラデーションを避ける
- ソリッドカラーを基本とする
- 透明度は10-20%程度に抑える

### 3. **視認性重視**
- 高コントラスト比を維持
- アクセシビリティ基準AAA準拠
- 背景は基本的に白またはごく薄い青

### 4. **実装例**

```tsx
// Before: 派手なグラデーション
background: "linear-gradient(90deg, #00d9ff, #9333ea, #ff006e)"

// After: 洗練された単色グラデーション
background: "linear-gradient(135deg, #0066CC, #003D7A)"

// アニメーションも控えめに
animate={{
  opacity: [0.8, 1],        // 色変化なし
  scale: [0.98, 1],         // 微細な動き
}}
```

## 適用箇所

1. **ヒーローセクション**
   - 背景: 白
   - アクセント: #0066CC のみ
   - テキスト: #1A202C

2. **カード/ボタン**
   - 背景: 白 + 薄い影
   - ボーダー: #E2E8F0
   - ホバー: #0066CC の5%透明度

3. **アニメーション**
   - 色の変化なし
   - 動きとスケールのみ
   - イージング重視