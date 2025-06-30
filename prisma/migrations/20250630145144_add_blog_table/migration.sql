-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "trendingKeyword" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_sourceUrl_key" ON "Blog"("sourceUrl");

-- CreateIndex
CREATE INDEX "Blog_trendingKeyword_idx" ON "Blog"("trendingKeyword");
