/**
 * @jest-environment jsdom
 */

describe('menuButton behavior', () => {
  let myObject;
  let ringClose;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="myObject"></div>
      <div class="ringClose" style="visibility: hidden"></div>
    `;
    // Ensure fresh modules for each test
    jest.resetModules();
    myObject = document.getElementById('myObject');
    ringClose = document.querySelector('.ringClose');
    require('../menuButton.js');
  });

  test('click toggles active class and ringClose visibility', () => {
    expect(myObject.classList.contains('active')).toBe(false);
    expect(ringClose.style.visibility).toBe('hidden');

    myObject.dispatchEvent(new Event('click'));
    expect(myObject.classList.contains('active')).toBe(true);
    expect(ringClose.style.visibility).toBe('visible');

    myObject.dispatchEvent(new Event('click'));
    expect(myObject.classList.contains('active')).toBe(false);
    expect(ringClose.style.visibility).toBe('hidden');
  });
});
