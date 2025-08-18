-- CreateTable
CREATE TABLE "OutreachCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutreachCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutreachTarget" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "contactEmail" TEXT,
    "type" TEXT NOT NULL,
    "authority" INTEGER NOT NULL,
    "relevance" INTEGER NOT NULL,
    "lastContactDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "campaignId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutreachTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutreachActivity" (
    "id" TEXT NOT NULL,
    "targetDomain" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "emailSubject" TEXT,
    "emailContent" TEXT,
    "responseReceived" BOOLEAN NOT NULL DEFAULT false,
    "responseContent" TEXT,
    "linkAcquired" BOOLEAN NOT NULL DEFAULT false,
    "linkUrl" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OutreachActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Backlink" (
    "id" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "anchorText" TEXT NOT NULL,
    "discoveredDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastCheckedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active',
    "domainAuthority" INTEGER,
    "pageAuthority" INTEGER,
    "traffic" INTEGER,
    "clicks" INTEGER,
    "outreachActivityId" TEXT,

    CONSTRAINT "Backlink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OutreachTarget_campaignId_idx" ON "OutreachTarget"("campaignId");
CREATE INDEX "OutreachTarget_status_idx" ON "OutreachTarget"("status");
CREATE INDEX "OutreachTarget_domain_idx" ON "OutreachTarget"("domain");
CREATE INDEX "OutreachActivity_campaignId_idx" ON "OutreachActivity"("campaignId");
CREATE INDEX "OutreachActivity_timestamp_idx" ON "OutreachActivity"("timestamp");
CREATE INDEX "Backlink_sourceUrl_idx" ON "Backlink"("sourceUrl");
CREATE INDEX "Backlink_status_idx" ON "Backlink"("status");

-- AddForeignKey
ALTER TABLE "OutreachTarget" ADD CONSTRAINT "OutreachTarget_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "OutreachCampaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Backlink" ADD CONSTRAINT "Backlink_outreachActivityId_fkey" FOREIGN KEY ("outreachActivityId") REFERENCES "OutreachActivity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
