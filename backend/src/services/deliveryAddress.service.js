const User = require('../models/user.model');
const Product = require('../models/product.model');
const Reservation = require('../models/reservations.model');
const mongoose = require('mongoose');

// Get paginated reservations
exports.getAllReservations = async (page = 1, limit = 10, keyword, userId, status) => {
  try {
    const skip = (page - 1) * limit;

    const matchConditions = {
      isDeleted: false 
    };

    if (userId && userId.trim() !== '') {
      matchConditions.userId = new mongoose.Types.ObjectId(userId);
    }

    if (typeof status !== 'undefined') {
      matchConditions.status = Number(status);
    }

    const pipeline = [
      {
        $match: matchConditions
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' }
    ];

    if (keyword && keyword.trim() !== '') {
      pipeline.push({
        $match: {
          'product.name': { $regex: keyword.trim(), $options: 'i' }
        }
      });
    }

    pipeline.push({ $skip: skip }, { $limit: limit });

    const reservations = await Reservation.aggregate(pipeline).exec();

    const countPipeline = [...pipeline].filter(stage => {
        const key = Object.keys(stage)[0];
        return !['$skip', '$limit'].includes(key); 
    });

    countPipeline.push({ $count: 'totalItems' });

    const countResult = await Reservation.aggregate(countPipeline).exec();
    const totalItems = countResult[0]?.totalItems || 0;

    return {
      data: reservations,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems
    };

  } catch (error) {
    throw new Error('Error getting reservations: ' + error.message);
  }
};

// Get reservation by ID
exports.getReservationById = async (id) => {
    try {
        const reservation = await Reservation.findOne({ _id: id, isDeleted: { $ne: true } })
            .populate({ path: 'userId', select: 'fullname email avatar' })
            .populate('productId');

        if (!reservation) {
            throw new Error('Reservation not found');
        }
        return reservation;
    } catch (error) {
        throw new Error('Error getting reservation: ' + error.message);
    }
};


// Create new reservation
exports.createReservation = async (reservationData) => {
    try {
        const reservation = new Reservation(reservationData);
        const newReservation = await reservation.save();
        return newReservation;
    } catch (error) {
        throw new Error('Error creating reservation: ' + error.message);
    }
};

// Update reservation
exports.updateReservation = async (id, reservationData) => {
    try {
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        if (reservationData.productId) reservation.productId = reservationData.productId;
        if (reservationData.userId) reservation.userId = reservationData.userId;
        if (reservationData.startDate) reservation.startDate = reservationData.startDate;
        if (reservationData.endDate) reservation.endDate = reservationData.endDate;
        if (reservationData.status) reservation.status = reservationData.status;

        return await reservation.save();
    } catch (error) {
        throw new Error('Error updating reservation: ' + error.message);
    }
};

// Delete reservation
exports.deleteReservation = async (id) => {
    try {
        const reservation = await Reservation.findOne({ _id: id, isDeleted: { $ne: true } });
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        reservation.isDeleted = true;
        await reservation.save();

        return { message: 'Reservation deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting reservation: ' + error.message);
    }
};
