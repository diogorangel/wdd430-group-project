'use client';

import { useState, useCallback, FormEvent, ChangeEvent, useMemo } from 'react';
import { useLocalStorage } from './lib/useLocalStorage';

// Database authors -> Mock Sellers/Artisans
const Sellers = [
  '', 
  'Klain Washington', 
  'David Smith',
  'Keroen Johnson',
  'Brenda Lee',
  'Sophia Martinez',
  'Liam Brown',
  'Olivia Davis',
  'Noah Wilson',
  'Ava Garcia',
  'Elijah Miller'
];


interface ProductListing {
  id: number;
  title: string; // Item title
  price: string; // Price of the product (kept as string for display, parsed for calculation)
  seller: string; // Seller/Artisan
  isFeatured: boolean; // Featured in the curation (instead of isComplete)
}

export default function Home() {
  // Local Storage Key changed for the new project
  const [listings, setListings] = useLocalStorage<ProductListing[]>('hh-product-listings', []);

  // State for the product title input
  const [productInput, setProductInput] = useState<string>('');

  // State for the selected seller
  const [sellerInput, setSellerInput] = useState<string>(Sellers[0]);

  // Dynamically calculate the next available ID
  const nextId = useMemo(() => {
    const maxId = listings.reduce((max, listing) => Math.max(max, listing.id), -1);
    return maxId + 1;
  }, [listings]);

  // --- NEW LOGIC: Calculate Total Sales per Seller ---
  const salesSummary = useMemo(() => {
    const totals: Record<string, number> = {};
    listings.forEach(listing => {
      // Parse the price string to a float for accurate summation
      const price = parseFloat(listing.price); 
      const seller = listing.seller;
      
      // Accumulate the total sales for the seller
      totals[seller] = (totals[seller] || 0) + price;
    });
    return totals;
  }, [listings]);


  // --- Handlers ---
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setProductInput(event.target.value);
  }, []);

  const handleSellerChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSellerInput(event.target.value);
  }, []);

  // Function to create a new product listing
  const createListing = useCallback(
    (event: FormEvent | null = null) => {
      event?.preventDefault();

      const listingTitle = productInput.trim();

      if (listingTitle === '') {
        alert('Please enter a product title!');
        return;
      }
      
      // Generate a random price between $1.00 and $100.00
      const randomPrice = (Math.floor(Math.random() * 9900) + 100) / 100;
      
      // Create the new listing
      const newListing: ProductListing = {
        id: nextId,
        title: listingTitle,
        // Store price as string formatted to 2 decimal places
        price: randomPrice.toFixed(2), 
        seller: sellerInput,
        isFeatured: false, 
      };

      setListings((prevListings) => [...prevListings, newListing]);

      // Clear and reset
      setProductInput('');
      setSellerInput(Sellers[0]);
    },
    [productInput, sellerInput, setListings, nextId]
  );

  // Function to remove a listing 
  const removeListing = useCallback(
    (id: number) => {
      setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
    },
    [setListings]
  );
  
  // Function to toggle featured status 
  const toggleFeaturedStatus = useCallback(
    (id: number) => {
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing.id === id ? { ...listing, isFeatured: !listing.isFeatured } : listing
        )
      );
    },
    [setListings]
  );
  
  // --- Filtering: Featured Items vs. Other Listings ---
  const featuredListings = useMemo(() => listings.filter(listing => listing.isFeatured), [listings]);
  const otherListings = useMemo(() => listings.filter(listing => !listing.isFeatured), [listings]);


  // --- Helper Component to Render the List ---
  const ListingList = ({ list, isFeaturedList }: { list: ProductListing[], isFeaturedList: boolean }) => (
    <ul id={isFeaturedList ? 'featured-listings' : 'all-listings'} className="product-list">
      {list.map((listing) => (
        <li key={listing.id} className={listing.isFeatured ? 'featured-item' : ''}>
          
          <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: '5px' }}>
            {/* Checkbox for Featured Status (WCAG 2.1 Level AA) */}
            <input
              type="checkbox"
              checked={listing.isFeatured}
              onChange={() => toggleFeaturedStatus(listing.id)}
              style={{ marginRight: '10px' }}
              aria-label={`Mark listing ${listing.title} by ${listing.seller} as ${listing.isFeatured ? 'standard' : 'featured'}`}
            />
            
            {/* Display product details: Seller, Title, and Price */}
            <span className="listing-text-content">
              <strong>[{listing.seller}]</strong> {listing.title} <span style={{color: '#eaeff4ff', fontWeight: 'bold'}}>${listing.price}</span>
            </span>
          </div>
          
          {/* Removal button */}
          <button
            className="delete-btn"
            onClick={() => removeListing(listing.id)}
            aria-label={`Remove listing: ${listing.title}`}
            style={{background: '#49dc35ff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer'}}
          >
            Remove Listing
          </button>
        </li>
      ))}
      {list.length === 0 && (
        <li>{isFeaturedList ? ' Sales with value, product and employee.' : 'No active  Sales with value, product and employee. List one above!'}</li>
      )}
    </ul>
  );
  

  return (
    <div className="container" style={{padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-geist-sans)'}}>
      <h1 style={{color: '#ffffffff'}}>Handcrafted Haven: Artisan Marketplace</h1>

      <form onSubmit={createListing} className="input-area" style={{marginBottom: '30px', border: '1px solid #d8ddc1ff', padding: '15px', borderRadius: '8px', background: '#2faac0ff'}}>
        <h2 style={{marginTop: '0', fontSize: '1.2rem'}}>Create a New Product Listing</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <select
            id="seller-select"
            value={sellerInput}
            onChange={handleSellerChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #c2c694ff', background: '#2faac0ff' }}
            aria-label="Select Artisan"
          >
            {Sellers.map((seller) => (
              <option key={seller} value={seller}>
                {seller}
              </option>
            ))}
          </select>

          <input
            type="text"
            id="new-listing-input"
            placeholder="Enter product name (e.g., Ceramic Mug, Wool Scarf)"
            value={productInput}
            onChange={handleInputChange} 
            style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccccccff' }} 
            aria-label="Product Name Input"
          />
        </div>

        <button id="add-btn" type="submit" style={{ width: '100%', padding: '10px', background: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit Products Sold by Seller and Price
        </button>
      </form>
      
      {/* --- Seller Sales Statistics --- */}
      <div className="seller-stats">
        <h2>💰 Seller Sales Summary</h2>
        <ul style={{listStyle: 'none', padding: '0'}}>
          {Object.entries(salesSummary).map(([seller, total]) => (
            <li key={seller} style={{marginBottom: '5px'}}>
              <strong>{seller}:</strong> <span style={{color: '#28a745', fontWeight: 'bold'}}>${total.toFixed(2)}</span> in sales
            </li>
          ))}
          {Object.keys(salesSummary).length === 0 && <li>No sales recorded yet.</li>}
        </ul>
      </div>

      
      {/* --- Curated/Featured Section --- */}
      <h2 style={{marginTop: '30px', marginBottom: '15px', color: '#d2e1c2ff', borderBottom: '1px solid #ffebcd', paddingBottom: '5px'}}>✨ Sales with value, product and employee ({featuredListings.length})</h2>
      <ListingList list={featuredListings} isFeaturedList={true} />
      
      <hr style={{margin: '30px 0', border: '0', borderTop: '1px dashed #ccc'}}/>

      {/* --- All Listings Section --- */}
      <h2 style={{marginBottom: '15px', color: '#171717'}}>📦 Products Sold ({otherListings.length})</h2>
      <ListingList list={otherListings} isFeaturedList={false} />
      
    </div>
  );
}