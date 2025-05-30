const logger = require('./logger');
const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = (request, response, next) => {
  //code that extracts the token
  const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '');
    }
    return null;
  };
  request.token = getTokenFrom(request);
  //return token
  //request.send(token)
  next();
};

const userExtractor = async (request, response, next) => {
  //console.log('decodedToken', jwt.verify(request.token,
  //  process.env.SECRET)  )
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  //console.log('decodedToken', decodedToken)
  if (!decodedToken.id) {
    //console.log('decodedToken3', decodedToken)
    return response.status(401).json({
      error: 'token invalid',
    });
  }
  const user = await User.findById(decodedToken.id);
  request.user = user;
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

/*const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message 
  })
  } else if (error.name === 'MongoServerError' && 
    error.message.includes('E11000 duplicate key error')) {    
    return response.status(400).json({ error: 'expected `username` to be unique' })  
  }

  next(error)
}*/
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' });
  } /*else if (error.name === 'MongoServerError') {    
    return response.status(400).json({ error: 'expected `password` to be sent' })  
  } */ else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid1' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
