# React Portfolio - Makefile
# Windows / macOS / Linux で共通して使えるよう、npm スクリプトをラップしています

.PHONY: help install dev build preview typecheck clean clean-all

# デフォルトターゲット：使い方を表示
help:
	@echo "Usage:"
	@echo "  make install    Install dependencies (npm install)"
	@echo "  make dev        Start dev server at http://localhost:5173"
	@echo "  make build      Build production bundle into dist/"
	@echo "  make preview    Preview the production build locally"
	@echo "  make typecheck  Run TypeScript type-check only"
	@echo "  make clean      Remove dist/"
	@echo "  make clean-all  Remove dist/ and node_modules/"

# 依存パッケージをインストール
install:
	npm install

# 開発サーバーを起動（Vite, http://localhost:5173）
dev:
	npm run dev

# 本番ビルド（出力先: dist/）
build:
	npm run build

# ビルド成果物をローカルで確認
preview:
	npm run preview

# 型チェックのみ（ビルドはしない）
typecheck:
	npx tsc --noEmit

# ビルド成果物の削除
clean:
	rm -rf dist

# 全クリーン（依存パッケージも削除）
clean-all: clean
	rm -rf node_modules
