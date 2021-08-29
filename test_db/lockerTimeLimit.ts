import { LockerType, PrismaClient, } from '@prisma/client'

const prisma = new PrismaClient

async function main(){
	const users = [
		{name: 'marlon', email: 'marlon@localhost.com'},
		{name: 'Ginger Ginger', email: 'ginger@localhost.com'},
		{name: 'Pong DeGuzman', email: 'pong@localhost.com'},
	]
	await Promise.all(
		users.map(async(user) => {
			await prisma.user.create({ data: user })
		})
	)
	await prisma.lockerTimeLimit.create({
		data: {
			lockerType: LockerType.LOCKERTYPE2,
			pickupTimeLimit: 12,
			pickupReclaimTimeLimit: 0,
			bookingExpiry: 0,
			shipoutTimeLimit: 0,
			shipoutReclaimTimeLimit: 0,
			storageTimeLimit: 0,
			storageReclaimTimeLimit: 0,
		}
	})
	const query = await prisma.user.findMany()
	console.dir(query, {depth: null})
}

main()
.catch(e => { throw e })
.finally(async() => await prisma.$disconnect() )