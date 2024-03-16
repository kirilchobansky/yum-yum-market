import { Food } from "../models/Food";

exports.getAll = () => Food.find();

exports.search = (search: string) => {
    const searchRegEx = new RegExp(search, 'i');
    const foods = Food.find({name: { $regex : searchRegEx }});
    return foods;
};

exports.getAllTags = async () => {
    const tags = await Food.aggregate([
      {
        $unwind:'$tags'
      },
      {
        $group:{
          _id: '$tags',
          count: {$sum: 1}
        }
      },
      {
        $project:{
          _id: 0,
          name:'$_id',
          count: '$count'
        }
      }
    ]).sort({count: -1});

    const all = {
      name : 'All',
      count: await Food.countDocuments()
    }

    tags.unshift(all);
    return tags;
};

exports.getAllFoodsByTag = (tag: string) => Food.find({tags: tag});

exports.getFoodById = (foodId: string) => Food.findById(foodId);