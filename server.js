const express = require("express")
const app = express()
const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')

const teachers = [
	{ id: 1, name: 'mike' },
	{ id: 2, name: 'cassandra' },
	{ id: 3, name: 'david' }
]

const courses = [
	{ id: 1, name: 'maths', teahcerId: 1 },
	{ id: 2, name: 'physics', teahcerId: 1 },
	{ id: 3, name: 'algebra', teacherId: 1 },
	{ id: 4, name: 'history', teacherId: 2 },
	{ id: 5, name: 'geography', teacherId: 2 },
	{ id: 6, name: 'civil science', teacherId: 2 },
	{ id: 7, name: 'biology', teacherId: 3 },
	{ id: 8, name: 'chimistry', teacherId: 3 }
]

const CourseType = new GraphQLObjectType({
    name: "CourseType",
    description: "this is a course",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        teacherId: { type: GraphQLNonNull(GraphQLInt) },
        teacher: {
            type: TeacherType,
            resolve: (course) => { return teachers.find(teacher => teacher.id === course.teacherId) }
        }
    })
})

const TeacherType = new GraphQLObjectType({
    name: 'TeacherType',
    description: 'this is an teacher of courses',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name:{ type: GraphQLNonNull(GraphQLString)},
        courses: {
            type: GraphQLList(CourseType),
            resolve: (teacher) => { return courses.filter(course => course.teacherId === teacher.id)}
        }
    })
})

const routeQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'this the route query',
    fields: () => ({
        courses: {
            type: GraphQLList(CourseType),
            description: 'this is a list of courses',
            resolve: () => courses
        },
        teachers: {
            type: GraphQLList(TeacherType),
            description: 'this is a list of teachers',
            resolve: () => teachers
        }
    })
})

const schema = new GraphQLSchema({
    query: routeQuery
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
app.listen(5000., () => console.log("its running"))