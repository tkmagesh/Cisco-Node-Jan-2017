var accumulatorFactory = require('./accumulator'),
	accumulator = accumulatorFactory();
	
accumulator.add(100);
accumulator.subtract(50);
accumulator.multiply(10);
accumulator.divide(2);
console.log(accumulator.getResult());