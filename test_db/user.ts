import { PrismaClient, } from '@prisma/client'

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
	const query = await prisma.user.findMany()
	console.dir(query, {depth: null})
}

main()
.catch(e => { throw e })
.finally(async() => await prisma.$disconnect() )
