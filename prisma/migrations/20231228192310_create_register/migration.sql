-- CreateTable
CREATE TABLE "register" (
    "register_id" SERIAL NOT NULL,
    "image" VARCHAR NOT NULL,
    "entity" VARCHAR(100) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "number" INTEGER NOT NULL,
    "state" CHAR(2) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "telephone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "register_pkey" PRIMARY KEY ("register_id")
);
