import { useState } from 'react';
import { Tabs, Radio, Card, Rate, Button, Space, Row, Col, Pagination } from 'antd';
import type { TabsProps } from 'antd';
import { HeartOutlined, EnvironmentOutlined } from '@ant-design/icons';

const categories = [
  { key: 'all', label: '全部' },
  { key: 'other', label: '其他美食' },
  { key: 'chinese', label: '中餐' },
  { key: 'fastfood', label: '快餐简餐' },
  { key: 'hotpot', label: '火锅' },
  { key: 'cafe', label: '咖啡馆' },
  { key: 'bbq', label: '烧烤' },
  { key: 'snack', label: '小餐馆/小吃' },
  { key: 'fresh', label: '清真' },
  { key: 'dessert', label: '甜点' },
  { key: 'seafood', label: '海鲜' },
  { key: 'japanese', label: '日式料理' },
  { key: 'bar', label: '酒馆/酒吧/居酒屋' },
];

const items: TabsProps['items'] = [
  {
    key: 'all',
    label: '全部(453308)',
  },
  {
    key: 'spots',
    label: '景点(5377)',
  },
  {
    key: 'food',
    label: '美食(167452)',
  },
  {
    key: 'shopping',
    label: '购物(14597)',
  },
  {
    key: 'activities',
    label: '活动(5253)',
  },
];

interface FoodItem {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
  isFavorite: boolean;
}

const foodItems: FoodItem[] = [
  {
    id: '1',
    name: '玉林串串香',
    rating: 4.5,
    reviews: 2420,
    description: '成都大众串串，味道就正常吧，很多连锁，还是推荐玉林路上的这家，单纯可以在玉林路接着吃别的',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d',
    category: 'chinese',
    price: 68,
    isFavorite: false
  },
  {
    id: '2',
    name: '春熙路龙抄手',
    rating: 4.8,
    reviews: 1834,
    description: '成都特色小吃，值得一试，传统风味，价格实惠',
    imageUrl: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    category: 'snack',
    price: 25,
    isFavorite: false
  },
  {
    id: '3',
    name: '得劲儿火锅',
    rating: 4.6,
    reviews: 3156,
    description: '成都本地连锁火锅，价格亲民，味道正宗，服务周到',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    category: 'hotpot',
    price: 128,
    isFavorite: false
  },
  {
    id: '4',
    name: '宽窄巷子张老二凉粉',
    rating: 4.3,
    reviews: 952,
    description: '正宗川式凉粉，配料丰富，口感独特，游客必打卡',
    imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa',
    category: 'snack',
    price: 15,
    isFavorite: false
  },
  {
    id: '5',
    name: 'BLUE CARIBOU CAFE',
    rating: 4.7,
    reviews: 628,
    description: '环境优雅，咖啡品质好，甜点可口，适合下午茶',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    category: 'cafe',
    price: 78,
    isFavorite: false
  },
  {
    id: '6',
    name: '马路边边麻辣烫',
    rating: 4.4,
    reviews: 1527,
    description: '怀旧风格装修，食材新鲜，特色麻辣烫，深受年轻人喜爱',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
    category: 'chinese',
    price: 45,
    isFavorite: false
  }
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const pageSize = 8;

  // 筛选逻辑
  const filteredItems = foodItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  // 排序逻辑
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortType) {
      case 'recommended':
        return b.rating - a.rating;
      case 'popular':
        return b.reviews - a.reviews;
      default:
        return b.rating - a.rating;
    }
  });

  // 分页逻辑
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCategoryChange = (e: any) => {
    console.log('Category changed:', e.target.value);
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: any) => {
    console.log('Sort type changed:', e.target.value);
    setSortType(e.target.value);
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed:', page);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (item: FoodItem) => {
    console.log('Navigate to:', item.name);
    // 这里可以添加导航逻辑，比如打开地图
    window.open(`https://maps.google.com/maps?q=${encodeURIComponent(item.name)}`, '_blank');
  };

  const handleFavorite = (itemId: string) => {
    console.log('Toggle favorite:', itemId);
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const handleTabChange = (key: string) => {
    console.log('Tab changed:', key);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">成都美食</h1>
        
        <Tabs 
          defaultActiveKey="food" 
          items={items} 
          className="mb-6"
          onChange={handleTabChange}
        />

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <span className="font-medium mr-4">美食分类：</span>
            <Radio.Group 
              value={selectedCategory}
              onChange={handleCategoryChange}
              buttonStyle="solid"
            >
              {categories.map(cat => (
                <Radio.Button key={cat.key} value={cat.key}>
                  {cat.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Radio.Group 
            value={sortType}
            onChange={handleSortChange}
          >
            <Radio value="recommended">微锦囊推荐</Radio>
            <Radio value="popular">按人气</Radio>
          </Radio.Group>
          
          <Button onClick={() => console.log('Sort by comprehensive')}>
            按综合
          </Button>
        </div>

        <Row gutter={[16, 16]} className="mt-6">
          {paginatedItems.map(item => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                }
                actions={[
                  <Button 
                    key="location" 
                    icon={<EnvironmentOutlined />}
                    onClick={() => handleNavigate(item)}
                  >
                    导航
                  </Button>,
                  <Button 
                    key="favorite" 
                    icon={<HeartOutlined />}
                    type={favorites.has(item.id) ? 'primary' : 'default'}
                    onClick={() => handleFavorite(item.id)}
                  >
                    {favorites.has(item.id) ? '已收藏' : '收藏'}
                  </Button>
                ]}
              >
                <Card.Meta
                  title={
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span className="text-orange-500">¥{item.price}/人</span>
                    </div>
                  }
                  description={
                    <Space direction="vertical">
                      <div>
                        <Rate disabled defaultValue={item.rating} />
                        <span className="ml-2 text-gray-500">{item.reviews}人点评</span>
                      </div>
                      <p className="text-gray-600 line-clamp-2">{item.description}</p>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        <div className="mt-8 flex justify-center">
          <Pagination
            current={currentPage}
            total={sortedItems.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;