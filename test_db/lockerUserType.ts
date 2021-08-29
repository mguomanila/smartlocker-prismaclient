import { LockerType, PrismaClient, } from '@prisma/client'

const prisma = new PrismaClient

async function main(){
	
	const query = await prisma.user.findMany()
	console.dir(query, {depth: null})
}

main()
.catch(e => { throw e })
.finally(async() => await prisma.$disconnect() )
