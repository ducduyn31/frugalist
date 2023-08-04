-- CreateTable
CREATE TABLE "group_members" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "is_guest" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "from_date" TIMESTAMP(3),
    "to_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_member_events" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "group_member_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "to_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_member_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_member_events" ADD CONSTRAINT "group_member_events_group_member_id_fkey" FOREIGN KEY ("group_member_id") REFERENCES "group_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
