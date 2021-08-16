import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

async function main(){
	// await prisma.user.create({
	// 	data: {name: 'marlon', email: 'marlon@localhost.com'}
	// })
	// await prisma.lockerTimeLimit.create({
	// 	data: {
	// 		lockerType: 'LockerType2',
	// 		pickupTimeLimit: 0,
	// 		pickupReclaimTimeLimit: 0,
	// 		bookingExpiry: 0,
	// 		shipoutTimeLimit: 0,
	// 		shipoutReclaimTimeLimit: 0,
	// 		storageTimeLimit: 0,
	// 		storageReclaimTimeLimit: 0,
	// 	}
	// })
	const query = await prisma.lockerTimeLimit.findUnique({
		where: {id: 2},
	}) 
	console.dir(query, {depth: null})
}

main()
.catch(e => { throw e })
.finally(async() => await prisma.$disconnect() )